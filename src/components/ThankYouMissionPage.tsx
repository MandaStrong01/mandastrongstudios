import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

interface ThankYouMissionPageProps {
  onBackToHome: () => void;
}

export const ThankYouMissionPage: React.FC<ThankYouMissionPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="mb-8">
          <video
            autoPlay
            loop
            muted={false}
            playsInline
            className="w-full max-w-4xl mx-auto rounded-lg border-2 border-purple-600"
          >
            <source src="/thatsallfolks.mp4" type="video/mp4" />
          </video>
        </div>

        <h1 className="text-6xl font-black text-center mb-4 text-purple-400">
          THAT'S ALL FOLKS!
        </h1>

        <div className="bg-gradient-to-br from-purple-900 to-purple-800 border-2 border-purple-600 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-center mb-6">A Special Thank You</h2>

          <div className="space-y-4 text-center text-gray-200">
            <p className="text-lg font-bold">
              To all current and future creators, dreamers, and storytellers...
            </p>

            <p className="text-base leading-relaxed">
              Your creativity and passion inspire positive change in the world. Through your films and stories,
              you have the power to educate, inspire, and bring awareness to critical issues like bullying prevention,
              social skills development, and humanity's collective growth.
            </p>

            <p className="text-base leading-relaxed">
              Every piece of content you create has the potential to touch hearts, change minds, and make our
              world a better place. Thank you for being part of this mission to combine creative expression with
              meaningful impact.
            </p>

            <p className="text-base leading-relaxed font-bold">
              Together, we are building a community of creators who use their talents to spread kindness,
              understanding, and hope. Your impact matters more than you know.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 mb-8 hover:border-purple-400 transition cursor-pointer">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen className="text-purple-400" size={32} />
            <h3 className="text-2xl font-black text-purple-400">Full User Guide To MandaStrong Studio</h3>
          </div>
          <p className="text-center text-gray-400">Click to access the complete guide</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-purple-600 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black mb-6">About Our Mission</h2>

          <div className="space-y-6">
            <div>
              <p className="text-base leading-relaxed mb-4">
                <span className="font-bold">MandaStrong Studio</span> is more than a filmmaking platform. It's part of a comprehensive
                educational initiative designed to bring awareness and action to schools regarding
                bullying prevention, social skills development, and the cultivation of humanity in our
                communities.
              </p>
            </div>

            <div className="bg-purple-900 bg-opacity-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Fundraiser: Educational Program on Bullying Prevention & Social Skills
              </h3>
              <p className="text-sm leading-relaxed mb-3">
                Through this comprehensive program, we provide educational resources and movie-based content to
                help schools address these critical issues. Our goal is to create safe, supportive
                environments where every student can thrive.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border-2 border-purple-600">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Heart className="text-red-500" size={24} />
                Supporting Our Heroes
              </h3>
              <p className="text-sm leading-relaxed mb-3">
                <span className="font-bold">All Etsy Store Proceeds Benefit Veterans Mental Health Services</span> ~ 100% of all
                proceeds from our Etsy Store fundraiser are donated directly to <span className="font-bold">Veterans Mental
                Health Services</span>, supporting those who have sacrificed so much for our freedom.
              </p>
              <p className="text-center mt-4 text-xl">
                Visit our fundraiser and learn more at{' '}
                <a href="https://MandaStrong1.Etsy.com" className="text-purple-400 font-bold hover:text-purple-300 underline text-2xl">
                  MandaStrong1.Etsy.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="text-purple-400" size={32} />
            <h2 className="text-3xl font-black text-purple-400">Full User Guide To MandaStrong Studio</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-purple-400 font-bold mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>• Use Back and Next buttons to navigate between pages</li>
                <li>• Pages 1-3: Welcome, Story & Concept, Login/Register</li>
                <li>• Pages 4-9: AI Tool Board with 720 creative tools</li>
                <li>• Page 10: Upload your existing movie</li>
                <li>• Page 11: Media Box with all generated assets</li>
              </ul>
            </div>

            <div>
              <h3 className="text-purple-400 font-bold mb-4">Editing & Export</h3>
              <ul className="space-y-2 text-sm">
                <li>• Pages 12-16: Professional editing tools with timeline</li>
                <li>• Page 17: Full screen preview of your finished film</li>
                <li>• Page 18: Terms of Service and Disclaimer</li>
                <li>• Page 19: Agent Grok 24/7 Help Desk</li>
                <li>• Page 20: Community Hub to share your work</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12 mb-20">
          <button
            onClick={onBackToHome}
            className="bg-black border-2 border-purple-600 text-white px-12 py-4 rounded-xl font-black text-xl hover:bg-purple-600 transition"
          >
            Back
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white py-3 px-6 flex justify-center items-center z-40">
        <div className="text-sm text-center">
          MandaStrong 2026 ~ Author Doxy The School Bully ~ <a href="https://MandaStrong1.Etsy.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">Click MandaStrong1.Etsy.com</a>
        </div>
      </div>
    </div>
  );
};
