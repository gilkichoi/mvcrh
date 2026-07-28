import React from 'react';
import { useLanguage } from '../LanguageContext';
import FacebookFeed from './FacebookFeed';

const mockBlogPosts = [
  {
    id: 1,
    title: "Understanding Hypertension: Causes and Prevention",
    category: "Disease Prevention",
    date: "October 18, 2026",
    author: "Dr. Jane Doe",
    excerpt: "Hypertension, or high blood pressure, is often called the silent killer. Learn about the risk factors and lifestyle changes you can make to prevent it.",
    content: "Full content about hypertension...",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "10 Daily Habits for Better Mental Health",
    category: "Wellness",
    date: "October 12, 2026",
    author: "Dr. John Smith",
    excerpt: "Mental health is just as important as physical health. Discover simple, daily habits that can significantly improve your emotional well-being.",
    content: "Full content about mental health...",
    image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Nutrition Tips for Managing Diabetes",
    category: "Diet & Nutrition",
    date: "October 5, 2026",
    author: "Nutritionist Sarah Lee",
    excerpt: "Managing diabetes effectively starts with what you eat. Here are practical nutrition tips to help you keep your blood sugar levels in check.",
    content: "Full content about diabetes nutrition...",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600"
  }
];

const BlogPage: React.FC = () => {
  const { tText } = useLanguage();

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">{tText('Health Education')}</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">{tText('Medical Blog & Health Tips')}</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {tText('Stay informed with the latest health advice, preventive care tips, and medical news from our experts.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mockBlogPosts.map(post => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col group">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-600/90 backdrop-blur text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    {tText(post.category)}
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4">
                  <span className="flex items-center gap-1"><i className="fa-regular fa-calendar"></i> {post.date}</span>
                  <span className="flex items-center gap-1"><i className="fa-regular fa-user"></i> {post.author}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">{tText(post.title)}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  {tText(post.excerpt)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Facebook Social Updates Section */}
        <div>
          <div className="mb-6">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <i className="fa-brands fa-facebook text-blue-600"></i>
              {tText('Official Facebook Page Updates')}
            </h3>
            <p className="text-slate-500 text-xs">
              {tText('Real-time posts from https://www.facebook.com/people/Moi-County-Referral-Hospital-Voi/100089810477442/')}
            </p>
          </div>
          <FacebookFeed />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
