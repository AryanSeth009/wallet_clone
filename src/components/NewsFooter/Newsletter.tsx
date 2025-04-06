import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
    return (
        <div className="bg-[#0A0B0F] bg-blur-xl  !font-sans  w-full flex justify-center items-center border border-gray-800 rounded-2xl p-8 mb-24">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-5xl">
                {/* Text Section */}
                <div className="flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-lg font-regular font-sans  text-purple-500 mb-3 uppercase tracking-wider">
                        GET FIRST UPDATE
                    </h2>
                    <p className="text-3xl font-sans font-regular text-white mb-8">
                        Get the news in front line by{' '}
                      
                        <span className="inline-block animate-bounce font-sans   text-purple-500">subscribe</span> our latest updates
                    </p>
                </div>
                {/* Input Section */}
                <div className="flex gap-4 w-full max-w-sm">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="h-12 bg-[#1a1625] rounded-xl font-sans border-gray-800 focus:border-purple-500 text-white placeholder:text-gray-500 w-full"
                    />
                    <Button className="h-12 rounded-xl   font-sans px-4 bg-purple-600 hover:bg-purple-700 text-white">
                        Subscribe
                    </Button>
                </div>
            </div>
        </div>
    );
}
