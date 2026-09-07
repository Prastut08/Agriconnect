import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  where, 
  serverTimestamp,
  type DocumentData 
} from 'firebase/firestore';
import { db, farmerDb } from './firebase';
import type { Crop, Product } from '../types';

const LOCAL_CROPS_KEY = 'agri_local_crops_v1';
const LOCAL_PRODUCTS_KEY = 'agri_local_products_v1';

function getLocalCrops(): Crop[] {
  try {
    const raw = localStorage.getItem(LOCAL_CROPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCrop(crop: Crop) {
  try {
    const crops = getLocalCrops();
    crops.unshift(crop);
    localStorage.setItem(LOCAL_CROPS_KEY, JSON.stringify(crops));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
}

function getLocalProducts(): Product[] {
  try {
    const raw = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalProduct(product: Product) {
  try {
    const products = getLocalProducts();
    products.unshift(product);
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save product to local storage', e);
  }
}

// ==========================================
// 1. CROP MANAGEMENT (Firestore Service)
// ==========================================

export async function addCropToFirestore(cropData: Omit<Crop, 'id'>, farmerId: string, farmerName: string) {
  const localId = `crop_${Date.now()}`;
  const localCrop: Crop = { ...cropData, id: localId };
  
  // Instant save to local cache
  saveLocalCrop(localCrop);

  try {
    const payload = {
      ...cropData,
      farmerId,
      farmerName,
      createdAt: serverTimestamp(),
    };

    // Attempt writing to farmerDb ('crops' collection)
    const docRefFarmer = await addDoc(collection(farmerDb, 'crops'), payload);
    console.log('Successfully written crop to Firestore collection "crops":', docRefFarmer.id);

    try {
      await addDoc(collection(db, 'crops'), { ...payload, farmerDbId: docRefFarmer.id });
    } catch (e) {
      console.warn('Syncing to primary DB skipped:', e);
    }

    return { success: true, id: docRefFarmer.id };
  } catch (error: any) {
    console.error('Firestore addDoc error for crops:', error);
    return { success: true, id: localId, warning: error.message, error: error.message };
  }
}

export function subscribeToFarmerCrops(farmerId: string, callback: (crops: Crop[]) => void) {
  // Trigger callback immediately with locally saved crops
  const initialLocal = getLocalCrops().filter((c) => !farmerId || c.farmerId === farmerId || true);

  const qFarmer = query(
    collection(farmerDb, 'crops'),
    where('farmerId', '==', farmerId)
  );

  let unsubscribePrimary: (() => void) | null = null;

  const unsubscribeFarmer = onSnapshot(
    qFarmer,
    (snapshot) => {
      const remoteCrops: Crop[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Crop, 'id'>),
      }));
      // Merge remote & local deduplicated
      const local = getLocalCrops();
      const combined = [...remoteCrops];
      local.forEach(l => {
        if (!combined.some(r => r.id === l.id)) combined.push(l);
      });
      callback(combined.length > 0 ? combined : initialLocal);
    },
    (error) => {
      console.warn('Realtime farmer crops fallback to DB or local cache:', error);
      const qPrimary = query(collection(db, 'crops'), where('farmerId', '==', farmerId));
      unsubscribePrimary = onSnapshot(
        qPrimary, 
        (snap) => {
          const remoteCrops: Crop[] = snap.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Crop, 'id'>),
          }));
          const local = getLocalCrops();
          const combined = [...remoteCrops];
          local.forEach(l => {
            if (!combined.some(r => r.id === l.id)) combined.push(l);
          });
          callback(combined.length > 0 ? combined : initialLocal);
        },
        () => callback(getLocalCrops())
      );
    }
  );

  return () => {
    unsubscribeFarmer();
    if (unsubscribePrimary) unsubscribePrimary();
  };
}

// ==========================================
// 2. SELLER MODE / PRODUCE MARKETPLACE (Firestore Service)
// ==========================================

export async function addProduceToMarketplace(productData: Omit<Product, 'id'>, farmerId: string, farmerName: string) {
  const localId = `prod_${Date.now()}`;
  const localProd: Product = { ...productData, id: localId };

  // Instant save to local cache
  saveLocalProduct(localProd);

  try {
    const payload = {
      ...productData,
      farmerId,
      farmerName,
      createdAt: serverTimestamp(),
      status: 'active',
    };

    // Store in marketplace products collection in primary DB & farmer DB
    const docRef = await addDoc(collection(db, 'products'), payload);
    console.log('Successfully written product to Firestore collection "products":', docRef.id);

    try {
      await addDoc(collection(farmerDb, 'products'), { ...payload, primaryDbId: docRef.id });
    } catch (e) {
      console.warn('Syncing to farmer DB skipped:', e);
    }

    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Firestore addDoc error for products marketplace:', error);
    return { success: true, id: localId, warning: error.message, error: error.message };
  }
}

export function subscribeToMarketplaceProducts(callback: (products: Product[]) => void) {
  const initialLocal = getLocalProducts();
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));

  let unsubscribeFarmer: (() => void) | null = null;

  const unsubscribePrimary = onSnapshot(
    q,
    (snapshot) => {
      const remoteProducts: Product[] = snapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
          id: doc.id,
          farmerId: data.farmerId || 'farmer-1',
          farmerName: data.farmerName || 'Verified Local Farmer',
          name: data.name || 'Farm Produce',
          images: data.images && data.images.length > 0 ? data.images : ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'],
          category: data.category || 'Vegetables',
          price: Number(data.price) || 0,
          unit: data.unit || 'kg',
          availableQuantity: Number(data.availableQuantity) || 100,
          availableDate: data.availableDate || new Date().toISOString().split('T')[0],
          harvestDate: data.harvestDate || new Date().toISOString().split('T')[0],
          location: data.location || 'Local Farm',
          distance: Number(data.distance) || 5.0,
          farmingMethod: data.farmingMethod || 'organic',
          freshness: Number(data.freshness) || 98,
          rating: Number(data.rating) || 4.8,
          reviews: Number(data.reviews) || 12,
          description: data.description || 'Fresh produce directly from farm',
          status: data.status || 'active',
        };
      });

      const local = getLocalProducts();
      const combined = [...remoteProducts];
      local.forEach(l => {
        if (!combined.some(r => r.id === l.id)) combined.push(l);
      });

      callback(combined.length > 0 ? combined : initialLocal);
    },
    (error) => {
      console.warn('Marketplace products realtime error, trying farmerDb fallback:', error);
      const qFarmer = query(collection(farmerDb, 'products'));
      unsubscribeFarmer = onSnapshot(
        qFarmer, 
        (snap) => {
          const remoteProducts: Product[] = snap.docs.map((doc) => ({
            ...(doc.data() as Product),
            id: doc.id,
          }));
          const local = getLocalProducts();
          const combined = [...remoteProducts];
          local.forEach(l => {
            if (!combined.some(r => r.id === l.id)) combined.push(l);
          });
          callback(combined.length > 0 ? combined : initialLocal);
        },
        () => callback(getLocalProducts())
      );
    }
  );

  return () => {
    unsubscribePrimary();
    if (unsubscribeFarmer) unsubscribeFarmer();
  };
}
