"use client";
import React from "react";
import { Navbar } from "../Navbar";
import { Button } from "../ui/button";
import { LeafyGreenIcon } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <main className="mx-20">
      <Navbar />
      <section className="relative">
        <div>
          <div className="flex flex-col gap-8 justify-center items-center">
            <h1 className="text-center font-medium leading-snug mt-20 text-5xl">
              Share Surplus ,
              <span className="text-green-600 font-semibold">Save Food,</span>{" "}
              <br /> Strengthen Community
            </h1>
            <p className="w-[60ch] text-center ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reiciendis, quaerat impedit cupiditate quas, ut sint ex veritatis
              esse culpa dolor
            </p>
            <div className="flex gap-8">
              <div className="border p-2 rounded-full">
                <Button className="p-6 text-black text-lg rounded-full bg-gray-200 hover:bg-slate-100 shadow-none">
                  Watch Video
                </Button>
              </div>
              <div className="border p-2 rounded-full">
                <Button className="p-6 text-lg rounded-full bg-green-500 shadow-none">
                  Donate Now
                </Button>
              </div>
            </div>
          </div>

          {/* // down section */}
          <div className="flex gap-5 mt-10 items-end h-[400px]">
            <div className=" rounded-3xl h-full flex gap-5 flex-col w-full">
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className=" h-[120px] rounded-3xl bg-lime-200"
              ></motion.div>
              <motion.div className=" flex-1 rounded-3xl bg-lime-200"></motion.div>
            </div>
            <div className="bg-lime-200 rounded-3xl h-[340px] w-full border"></div>
            <div className=" rounded-3xl flex-col justify-end flex gap-5 h-full w-full">
              <motion.div className=" h-[180px] rounded-3xl bg-lime-200"></motion.div>
              <motion.div className=" h-[120px] rounded-3xl bg-lime-200"></motion.div>
            </div>
            <div className="bg-lime-200 rounded-3xl h-full w-full border"></div>
          </div>
        </div>
      </section>

      <section className="my-20 overflow-hidden">
        <div className="border-y">
          <motion.div
            className="py-10 capitalize flex gap-10 text-5xl whitespace-nowrap"
            initial={{ x: "0" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 10, // Adjust for speed
              ease: "linear",
            }}
          >
            <p>Steps towards eco friendly living culture</p>
            <LeafyGreenIcon size={30} />
            <p>Steps towards eco friendly living culture</p>
            <LeafyGreenIcon size={30} />
            <p>Steps towards eco friendly living culture</p>
          </motion.div>
        </div>
      </section>

      <section className="my-20">
        <div className=" flex flex-col items-center">
          <h1 className="text-center font-medium mb-5 mt-20 text-5xl leading-snug">
            Simple, Trusted, Impactful
            <br /> How We Help You Give Back
          </h1>
          <p className="w-[60ch] text-lg text-center ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reiciendis, quaerat impedit cupiditate quas, ut sint ex veritatis
            esse culpa dolor
          </p>
        </div>
        <div className="flex my-10 gap-8">
          <div className="p-10 rounded-2xl flex flex-col gap-5 border items-start">
            <div className="p-8 rounded-2xl bg-lime-200">
              <LeafyGreenIcon size={40} />
            </div>
            <h3 className="text-2xl">Avoid Food Wastage</h3>
            <p className="w-fit">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem
              ipsum dolor sit amet.
            </p>
          </div>
          <div className="p-10 rounded-2xl flex flex-col gap-5 border items-start">
            <div className="p-8 rounded-2xl bg-lime-200">
              <LeafyGreenIcon size={40} />
            </div>
            <h3 className="text-2xl">Avoid Food Wastage</h3>
            <p className="w-fit">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem
              ipsum dolor sit amet.
            </p>
          </div>
          <div className="p-10 rounded-2xl flex flex-col gap-5 border items-start">
            <div className="p-8 rounded-2xl bg-lime-200">
              <LeafyGreenIcon size={40} />
            </div>
            <h3 className="text-2xl">Avoid Food Wastage</h3>
            <p className="w-fit">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem
              ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </section>

      <section className="my-20">
        <div className="flex p-10 border rounded-2xl">
          <div>
            <h1>Small Changes Make a Big Diffrence</h1>
            <p className="p-5 text-lg bg-slate-100">Lorem ipsum dolor sit amet consectetur, adipisicing elit.lorem</p>
          </div>
          <div>
            Image
          </div>
        </div>  
      </section>
    </main>
  );
};

export default Hero;
