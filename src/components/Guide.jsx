import React from "react";
import mockup1 from "../assets/mockups/1.png";
import mockup2 from "../assets/mockups/2.png";
import mockup3 from "../assets/mockups/3.png";
import mockup4 from "../assets/mockups/4.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Guide = () => {
  return (
    <div className="p-5 bg-black">
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Step 1
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Search for the Movie
          </h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            To begin, open the BollyFlix website in your browser. At the top of
            the page, you’ll find a search bar. Type the name of the movie,
            "Bhaag Milkha Bhaag," into the search bar and press the search icon
            or hit enter. This will display all available results for the
            movie.
          </p>
          <div className="flex items-center justify-center w-full h-80">
            <LazyLoadImage
              effect="blur"
              className="object-contain h-80"
              src={mockup1}
              alt="Search for the Movie"
            />
          </div>
        </li>
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Step 2
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Select Your Preferred Format
          </h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            Once the search results are displayed, locate the poster for "Bhaag
            Milkha Bhaag." You’ll see various download options based on quality
            and file size. The options usually include formats like 480p
            (630MB), 720p (1.6GB), 1080p (3.8GB), and 1080p HQ (21GB). Decide on
            the format that best suits your needs and proceed by selecting it.
          </p>
          <div className="flex items-center justify-center w-full h-80">
            <LazyLoadImage
              effect="blur"
              className="object-contain h-80"
              src={mockup2}
              alt="Select Your Preferred Format"
            />
          </div>
        </li>
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Step 3
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Complete the Verification
          </h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            Before the download link becomes active, you might be required to
            complete a verification process. This usually involves clicking on
            an "I’m not a robot" button and waiting for a few seconds. Ensure
            you complete this step to proceed further.
          </p>
          <div className="flex items-center justify-center w-full h-80">
            <LazyLoadImage
              effect="blur"
              className="object-contain h-80"
              src={mockup3}
              alt="Complete the Verification"
            />
          </div>
        </li>
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Step 4
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Start the Download
          </h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            Once the verification process is complete, the download link will
            be activated. Click on the link, and your movie will begin
            downloading to your device. Make sure to save the file in an
            appropriate location for easy access.
          </p>
          <div className="flex items-center justify-center w-full h-80">
            <LazyLoadImage
              effect="blur"
              className="object-contain h-80"
              src={mockup4}
              alt="Start the Download"
            />
          </div>
        </li>
      </ol>
    </div>
  );
};

export default Guide;
