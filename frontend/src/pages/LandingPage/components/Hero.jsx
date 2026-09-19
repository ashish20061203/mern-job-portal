import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Users,
  Building2,
  TrendingUp,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Hero = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: "Active Users", value: "2.4M+" },
    { icon: Building2, label: "Companies", value: "50K+" },
    { icon: TrendingUp, label: "Jobs Posted", value: "150K+" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white pt-28 pb-20 min-h-[calc(100vh-70px)] flex items-center">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl" />

        <div className="absolute top-32 left-[12%] w-2 h-2 bg-blue-400 rounded-full" />
        <div className="absolute top-48 right-[15%] w-3 h-3 bg-purple-400 rounded-full" />
        <div className="absolute bottom-32 right-[25%] w-2 h-2 bg-indigo-400 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* Small Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-7 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Build your future with the right opportunity</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.08] tracking-tight"
          >
            Find Your Dream Job
            <span className="block mt-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              or Perfect Hire
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 mt-7 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Connect talented professionals with innovative companies.
            Discover opportunities, find great talent, and take the next
            step in your career.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/find-jobs")}
              className="group w-full sm:w-auto min-w-[190px] bg-gradient-to-r from-blue-600 to-purple-600 text-white px-7 py-4 rounded-xl font-semibold text-base shadow-lg shadow-blue-200 hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>Find Jobs</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                )
              }
              className="group w-full sm:w-auto min-w-[190px] bg-white border border-gray-200 text-gray-700 px-7 py-4 rounded-xl font-semibold text-base shadow-sm hover:shadow-lg hover:border-blue-200 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-5 h-5" />
              <span>Post a Job</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7 + index * 0.1,
                  duration: 0.6,
                }}
                whileHover={{ y: -4 }}
                className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-blue-600" />
                  </div>

                  <div className="text-left">
                    <div className="text-xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Trust Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10 text-sm text-gray-500"
          >
            Simple. Professional. Built for modern job seekers and employers.
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;