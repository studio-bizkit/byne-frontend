import Image from 'next/image';

export default function Header() {
  return (
    <div className="h-screen flex flex-col mt-16">
      {/* Top Section - 4/5 height with rounded image and logo */}
      <div className="relative h-3/5">
        <div className="h-full mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6 lg:mt-8">
          <div className="relative h-full rounded-2xl overflow-hidden">
            <Image
              src="/estate-hero.png"
              alt="Coffee Cherries"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Bottom Section - 1/5 height with text columns */}
      <div className="h-1/5 w-full flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="text-left">
              <p className="text-lg sm:text-xl leading-relaxed text-primary">
                Bynekere Estate is an historic coffee plantation 
                located in the Baba Budangiri Hills near 
                Chikmagalur, Karnataka.
              </p>
            </div>
            <div className="text-left">
              <p className="text-lg sm:text-xl leading-relaxed text-primary">
                Byne delivers high-quality, sustainably grown 
                coffee from our farms to businesses and 
                coffee lovers alike. Through our homestay, 
                guests can experience the plantation life and 
                the story behind every bean.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}