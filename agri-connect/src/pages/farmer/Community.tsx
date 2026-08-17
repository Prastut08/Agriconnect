import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { Heart, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { mockCommunityPosts } from '../../data/mockData';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'question', label: 'Questions' },
  { id: 'equipment-sharing', label: 'Equipment' },
  { id: 'labour', label: 'Labour' },
  { id: 'bulk-buying', label: 'Bulk Buying' },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('all');
  const [newPost, setNewPost] = useState('');

  const filteredPosts = activeTab === 'all' ? mockCommunityPosts : mockCommunityPosts.filter((p) => p.category === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Farmer Community</h1>
        <p className="text-text-light">Connect with farmers near you</p>
      </div>

      <Tabs
        tabs={categories.map((cat) => ({ id: cat.id, label: cat.label }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">RK</span>
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your experience or ask a question..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Add photo">
                        <span className="text-xs text-text-light">Photo</span>
                      </button>
                    </div>
                    <Button size="sm" disabled={!newPost.trim()}>Post</Button>
                  </div>
                </div>
              </div>
            </Card>

            {filteredPosts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">{post.farmerName.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-text">{post.farmerName}</h4>
                      <Badge variant="primary">{post.category}</Badge>
                    </div>
                    <p className="text-xs text-text-light">{new Date(post.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <h3 className="font-bold text-text mb-2">{post.title}</h3>
                <p className="text-sm text-text-light mb-3">{post.content}</p>
                {post.aiAnswer && (
                  <div className="p-4 bg-green-50 rounded-2xl border border-green-200 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-green-800">AI Answer</span>
                    </div>
                    <p className="text-sm text-green-700">{post.aiAnswer}</p>
                  </div>
                )}
                <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                  <button className="flex items-center gap-1.5 text-sm text-text-light hover:text-text transition-colors">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-text-light hover:text-text transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-text-light hover:text-text transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold text-text mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-light">Total Members</span>
                  <span className="text-sm font-bold text-text">12,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-light">Active Today</span>
                  <span className="text-sm font-bold text-text">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-light">Posts This Week</span>
                  <span className="text-sm font-bold text-text">89</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-text mb-4">Trending Topics</h3>
              <div className="space-y-2">
                {['Wheat irrigation tips', 'Organic pest control', 'Government schemes 2025', 'Market prices today'].map((topic, idx) => (
                  <button key={idx} className="w-full text-left px-3 py-2 text-sm text-text-light hover:bg-gray-50 rounded-xl transition-colors">
                    #{topic}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-text mb-4">Nearby Farmers</h3>
              <div className="space-y-3">
                {mockCommunityPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{post.farmerName.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text">{post.farmerName}</p>
                      <p className="text-xs text-text-light">2 km away</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
