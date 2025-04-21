import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="py-20 bg-cafe-cream overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-cafe-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cafe-burgundy/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image with enhanced effects */}
          <motion.div 
            className="w-full md:w-1/2 lg:pl-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div 
                className="relative z-10 rounded-lg overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="CafeMRP Interior" 
                  className="w-full h-auto rounded-lg object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span 
                    className="text-white font-playfair text-xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    Where Every Cup Tells a Story
                  </motion.span>
                </motion.div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-cafe-gold rounded-lg hidden md:block z-0"
                animate={{ 
                  rotate: isHovered ? 10 : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                style={{ y }}
                transition={{ duration: 0.4 }}
              ></motion.div>
              
              <motion.div 
                className="absolute -top-4 -left-4 w-20 h-20 border-2 border-cafe-burgundy rounded-lg hidden md:block z-0"
                animate={{ 
                  rotate: isHovered ? -5 : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.4 }}
              ></motion.div>
              
              {/* Coffee beans scattered decoration */}
              <div className="absolute -right-8 top-1/4 hidden md:block">
                <motion.div
                  animate={{ rotate: [0, 10, 0], y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                >
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 7.5C3 7.5 2 11.5 2 11.5C2 11.5 7 12.5 7 7.5Z" fill="#6F4E37"/>
                    <path d="M17 7.5C21 7.5 22 11.5 22 11.5C22 11.5 17 12.5 17 7.5Z" fill="#6F4E37"/>
                    <path d="M12 12C7.5 12 7 20 7 20C7 20 16.5 20 12 12Z" fill="#6F4E37"/>
                    <path d="M12 12C16.5 12 17 20 17 20C17 20 7.5 20 12 12Z" fill="#6F4E37"/>
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Content with enhanced styling */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-playfair font-bold text-cafe-darkBrown mb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative z-10">Our Story</span>
              <motion.span 
                className="absolute bottom-0 left-0 h-2 bg-cafe-gold"
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-cafe-brown font-poppins mb-5 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Founded in 2018, CafeMRP has quickly become the heart of the community, offering a unique combination of specialty coffee, gourmet food, and craft cocktails.
            </motion.p>
            
            <motion.p 
              className="text-cafe-brown font-poppins mb-5 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our mission is simple: create a warm, inviting space where people can gather to enjoy exceptional food and drink in a relaxed atmosphere. Every detail, from our carefully sourced coffee beans to our locally inspired menu, reflects our commitment to quality and sustainability.
            </motion.p>

            <motion.p 
              className="text-cafe-brown font-poppins mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Whether you're starting your day with a freshly brewed coffee, meeting friends for lunch, or unwinding in the evening with a signature cocktail, CafeMRP provides the perfect setting for every occasion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button 
                className="bg-cafe-gold hover:bg-cafe-darkBrown text-cafe-darkBrown hover:text-white font-poppins font-medium px-8 py-3 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Us
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
