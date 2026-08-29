import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, ArrowUpRight, Compass, ShieldCheck, Heart, Leaf, Map, Users } from 'lucide-react';

interface AboutUsViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ onNavigate }) => {
  return (
    <div id="about-us-view" className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      
      {/* Hero Section matching Image 10 */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 min-h-[460px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpvRNzJL_lFioVKnynSSBhHQw_DgwOmjoi87NdDNo8b1Tl2_He9aRtjaktXc7oDmlKRTjxrTOzLamERdQ_WhowH22ceM4a9-wz23TROW_2ONA5gXABaYPFuzv81SkwDYGz5I0SGcUzTs5ShKOoiD0jmkv_L8ID6Wxrwn7coAC-jCEZOcXxgTAKvDFFouFmy6HvYDKri0yrB7jb0evx_yJLv7JRXyM9lJNSg5Hjdi7DlRLEcQ4aEJiE"
            alt="Misty mountain valley"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-white">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold text-[#b8cbbc]">Our Story</span>
            <span>The Journey Begins</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white font-playfair tracking-tight leading-tight">
            Organic Exploration. <br />
            <span className="italic">Redefining Travel.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed font-manrope">
            We believe true discovery lies beyond crowded tourist trails. We craft intimate journeys that immerse you in untouched landscapes, preserved heritage, and slow luxury.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('packages')}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#b8cbbc] text-[#233429] text-xs font-bold uppercase tracking-wider hover:bg-[#d4e7d8] transition-colors shadow-xl cursor-pointer"
            >
              <span>Explore Curated Journeys</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Our Core Philosophy Bento Grid matching Image 10 */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-[#b8cbbc]">
            <Compass className="w-3.5 h-3.5" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-playfair">
            Our Core Philosophy
          </h2>
          <p className="text-sm text-[#c3c8c2]">
            Every itinerary is built upon four foundational pillars of mindful exploration.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Sustainable Immersion (Span 7 with rich moss photo background) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[340px] border border-white/10 p-8 flex flex-col justify-end group shadow-xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXo7sO48bdXcqUlKbRA7Exjm8BgRXUleL-Bm0YRZEsgh-fWKHctpu4FuUvjGyA6JmxTliDxC4T0oDHJez5nV4dYxQjhCVWZx3zFoB8ot7LObKVC_e9pGgOG2nG-pPWaETKsmH9hCrgyaxXXdp1eEbEEgUYUleGmzcML-9O3rFBE6Wlxcm2N6AEJsGuqnulHc9gsuVIddzZFixX15-WSdepoZ3sYkjgI-xIMeUY8KEFHgWJ51zcXqIB"
              alt="Sustainable Immersion moss texture"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#b8cbbc] mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white font-playfair">Sustainable Immersion</h3>
              <p className="text-sm text-white/80 leading-relaxed max-w-lg">
                Leaving places better than we found them. We partner with local conservationists, eliminate single-use plastics, and fund habitat restoration across all routes.
              </p>
            </div>
          </div>

          {/* Card 2: Off the Beaten Path (Span 5 dark glass) */}
          <div className="lg:col-span-5 rounded-3xl glass-panel border border-white/10 p-8 flex flex-col justify-between shadow-xl">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#b8cbbc] mb-4">
              <Map className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#b8cbbc] font-semibold">Exclusivity</span>
              <h3 className="text-2xl font-bold text-white font-playfair">Off the Beaten Path</h3>
              <p className="text-sm text-[#c3c8c2] leading-relaxed">
                Venturing into secluded mountain passes, private islets, and remote alpine sanctuaries where tranquility and untouched silence reign supreme.
              </p>
            </div>
          </div>

          {/* Card 3: Mindful Pace (Span 5 dark glass) */}
          <div className="lg:col-span-5 rounded-3xl glass-panel border border-white/10 p-8 flex flex-col justify-between shadow-xl">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#b8cbbc] mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#b8cbbc] font-semibold">Slow Living</span>
              <h3 className="text-2xl font-bold text-white font-playfair">Mindful Pace</h3>
              <p className="text-sm text-[#c3c8c2] leading-relaxed">
                Slow travel experiences designed to savor mornings, unhurried multi-course dining, and meaningful encounters rather than racing between checkpoints.
              </p>
            </div>
          </div>

          {/* Card 4: Curated Connections (Span 7 with intimate gathering photo background) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[340px] border border-white/10 p-8 flex flex-col justify-end group shadow-xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS2z7csLHFHZatTv9V6QXiJJAdlgdf6gRWXwJupZV_zlD_TivJ95jB6aB4VOhoxCFL6wAL5zIpHb_dkjusAkGuO5NkBm5ow5XQpy6WVfYd53L9G1_0zsQSGPLVrF_p1UsGX94UYIkJHnX-B_S70QHs_06LuUKMwbCq9P_S2A034E5QQsgnbKWzdt_6Xpf5eE7DKE_X_byDljv8juaVxI-7sYxiRLbnDBJXtS3ikFXuPYC7egE5QFYV"
              alt="Curated Connections artisan meal"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#b8cbbc] mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white font-playfair">Curated Connections</h3>
              <p className="text-sm text-white/80 leading-relaxed max-w-lg">
                Direct access to master winemakers, heritage boatwrights, and generational hosts who open doors to authentic regional traditions.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Impact Numbers */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center shadow-xl">
        <div className="space-y-1">
          <p className="text-4xl sm:text-5xl font-bold text-white font-playfair">100%</p>
          <p className="text-xs uppercase tracking-wider text-[#b8cbbc] font-semibold">Carbon Neutral Guarantee</p>
          <p className="text-xs text-[#8d928d]">Direct offsets for all flights & ground logistics</p>
        </div>
        <div className="space-y-1 sm:border-x sm:border-white/10 sm:px-6">
          <p className="text-4xl sm:text-5xl font-bold text-white font-playfair">15+</p>
          <p className="text-xs uppercase tracking-wider text-[#b8cbbc] font-semibold">Years of Bespoke Craft</p>
          <p className="text-xs text-[#8d928d]">Pioneering authentic experiential exploration</p>
        </div>
        <div className="space-y-1">
          <p className="text-4xl sm:text-5xl font-bold text-white font-playfair">98.6%</p>
          <p className="text-xs uppercase tracking-wider text-[#b8cbbc] font-semibold">Five-Star Guest Rating</p>
          <p className="text-xs text-[#8d928d]">Voted world's premier slow luxury collective</p>
        </div>
      </div>

    </div>
  );
};
