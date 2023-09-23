"use client";
import { Carousel, Card } from "@material-tailwind/react";
import Image from "next/image"
export function Main() {
    return (
        <Card className="h-[calc(100vh-6rem)] w-full top-3 p-2 ml-5 mr-2">
            <Carousel
                className="rounded-xl"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                    }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                <div className="h-full w-full">
                    <div className="relative h-[calc(100vh-7rem)] w-full">
                        <Image
                            src="/favicon.ico"
                            alt="image 1"
                            fill={true}
                            className="object-cover" />
                    </div>
                </div>
                <div className="h-ful w-full">
                    <div className="relative h-[calc(100vh-7rem)] w-full">
                        <Image
                            src="/favicon.ico"
                            alt="image 1"
                            fill={true}
                            className="object-cover" />
                    </div>
                </div>
                <div className="h-ful w-full">
                    <div className="relative h-[calc(100vh-7rem)] w-full">
                        <Image
                            src="/favicon.ico"
                            alt="image 1"
                            fill={true}
                            className="object-cover" />
                    </div>
                </div>
            </Carousel>
        </Card>
    );
}