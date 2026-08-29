import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, ArrowUpRight, Compass, ShieldCheck, Heart, Leaf, Map, Users } from 'lucide-react';

interface AboutUsViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ onNavigate }) => {
  return (
    <div id="about-us-view" className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-200/80 min-h-[460px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpvRNzJL_lFioVKnynSSBhHQw_DgwOmjoi87NdDNo8b1Tl2_He9aRtjaktXc7oDmlKRTjxrTOzLamERdQ_WhowH22ceM4a9-wz23TROW_2ONA5gXABaYPFuzv81SkwDYGz5I0SGcUzTs5ShKOoiD0jmkv_L8ID6Wxrwn7coAC-jCEZOcXxgTAKvDFFouFmy6HvYDKri0yrB7jb0evx_yJLv7JRXyM9lJNSg5Hjdi7DlRLEcQ4aEJiE"
            alt="Misty mountain valley"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/90 via-[#0f2b5c]/70 to-[#0a192f]/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white">
            <span className="bg-[#1e40af] text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">Our Story</span>
            <span>The Journey Begins</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-playfair tracking-tight leading-tight">
            Organic Exploration. <br />
            <span className="italic font-normal text-blue-200">Redefining Travel.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-manrope">
            We believe true discovery lies beyond crowded tourist trails. We craft intimate journeys that immerse you in untouched landscapes, preserved heritage, and slow luxury.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('packages')}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#1e40af] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] hover:scale-105 transition-all shadow-xl cursor-pointer"
            >
              <span>Explore Curated Journeys</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Our Core Philosophy Bento Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#1e40af] shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#1e40af]" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] font-playfair">
            Our Core Philosophy
          </h2>
          <p className="text-sm text-[#475569]">
            Every itinerary is built upon four foundational pillars of mindful exploration.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Sustainable Immersion (Span 7 with rich moss photo background) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[340px] border border-blue-200/80 p-8 flex flex-col justify-end group shadow-xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXo7sO48bdXcqUlKbRA7Exjm8BgRXUleL-Bm0YRZEsgh-fWKHctpu4FuUvjGyA6JmxTliDxC4T0oDHJez5nV4dYxQjhCVWZx3zFoB8ot7LObKVC_e9pGgOG2nG-pPWaETKsmH9hCrgyaxXXdp1eEbEEgUYUleGmzcML-9O3rFBE6Wlxcm2N6AEJsGuqnulHc9gsuVIddzZFixX15-WSdepoZ3sYkjgI-xIMeUY8KEFHgWJ51zcXqIB"
              alt="Sustainable Immersion moss texture"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/95 via-[#0f2b5c]/60 to-transparent" />
            
            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-emerald-300 mb-3 shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white font-playfair">Sustainable Immersion</h3>
              <p className="text-sm text-slate-100 leading-relaxed max-w-lg">
                Leaving places better than we found them. We partner with local conservationists, eliminate single-use plastics, and fund habitat restoration across all routes.
              </p>
            </div>
          </div>

          {/* Card 2: Off the Beaten Path (Span 5 dark glass) */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-blue-100 p-8 flex flex-col justify-between shadow-lg shadow-blue-950/5 hover:shadow-xl hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e40af] mb-4 shadow-sm">
              <Map className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#1e40af] font-bold">Exclusivity</span>
              <h3 className="text-2xl font-bold text-[#0f172a] font-playfair">Off the Beaten Path</h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Venturing into secluded mountain passes, private islets, and remote alpine sanctuaries where tranquility and untouched silence reign supreme.
              </p>
            </div>
          </div>

          {/* Card 3: Mindful Pace (Span 5 dark glass) */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-blue-100 p-8 flex flex-col justify-between shadow-lg shadow-blue-950/5 hover:shadow-xl hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e40af] mb-4 shadow-sm">
              <Heart className="w-5 h-5 text-rose-500" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#1e40af] font-bold">Slow Living</span>
              <h3 className="text-2xl font-bold text-[#0f172a] font-playfair">Mindful Pace</h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Slow travel experiences designed to savor mornings, unhurried multi-course dining, and meaningful encounters rather than racing between checkpoints.
              </p>
            </div>
          </div>

          {/* Card 4: Curated Connections (Span 7 with intimate gathering photo background) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[340px] border border-blue-200/80 p-8 flex flex-col justify-end group shadow-xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS2z7csLHFHZatTv9V6QXiJJAdlgdf6gRWXwJupZV_zlD_TivJ95jB6aB4VOhoxCFL6wAL5zIpHb_dkjusAkGuO5NkBm5ow5XQpy6WVfYd53L9G1_0zsQSGPLVrF_p1UsGX94UYIkJHnX-B_S70QHs_06LuUKMwbCq9P_S2A034E5QQsgnbKWzdt_6Xpf5eE7DKE_X_byDljv8juaVxI-7sYxiRLbnDBJXtS3ikFXuPYC7egE5QFYV"
              alt="Curated Connections artisan meal"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/95 via-[#0f2b5c]/60 to-transparent" />

            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-blue-200 mb-3 shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white font-playfair">Curated Connections</h3>
              <p className="text-sm text-slate-100 leading-relaxed max-w-lg">
                Direct access to master winemakers, heritage boatwrights, and generational hosts who open doors to authentic regional traditions.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Impact Numbers */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-blue-100 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center shadow-xl shadow-blue-950/5">
        <div className="space-y-1">
          <p className="text-4xl sm:text-5xl font-bold text-[#0f2b5c] font-playfair">100%</p>
          <p className="text-xs uppercase tracking-wider text-[#1e40af] font-bold">Carbon Neutral Guarantee</p>
          <p className="text-xs text-slate-500 font-medium">Direct offsets for all flights & ground logistics</p>
        </div>
        <div className="space-y-1 sm:border-x sm:border-blue-100 sm:px-6">
          <p className="text-4xl sm:text-5xl font-bold text-[#0f2b5c] font-playfair">15+</p>
          <p className="text-xs uppercase tracking-wider text-[#1e40af] font-bold">Years of Bespoke Craft</p>
          <p className="text-xs text-slate-500 font-medium">Pioneering authentic experiential exploration</p>
        </div>
        <div className="space-y-1">
          <p className="text-4xl sm:text-5xl font-bold text-[#0f2b5c] font-playfair">98.6%</p>
          <p className="text-xs uppercase tracking-wider text-[#1e40af] font-bold">Five-Star Guest Rating</p>
          <p className="text-xs text-slate-500 font-medium">Voted world's premier slow luxury collective</p>
        </div>
      </div>

    </div>
  );
};
