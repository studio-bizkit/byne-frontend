import { PixelImage } from './ui/PixelImage';

export default function Header() {
    return (
        <div className="h-screen flex flex-col mt-24">
            {/* Top Section - 4/5 height with rounded image and logo */}
            <div className="relative h-3/5">
                <div className="h-full mx-4 sm:mx-6 lg:mx-8">
                    <div className="relative h-full rounded-2xl overflow-hidden">
                        <PixelImage
                            src="/estate-hero.png"
                            grid="9x5"
                            grayscaleAnimation={true}
                            pixelFadeInDuration={800}
                            maxAnimationDelay={1000}
                            colorRevealDelay={900}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Section - 1/5 height with text columns */}
            <div className="h-1/5 w-full flex items-center">
                <div className="mx-20 px-4 sm:px-6 lg:px-8 w-full">
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