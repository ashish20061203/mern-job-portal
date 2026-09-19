import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Briefcase,
  Target,
  ArrowUpRight,
} from "lucide-react";

const Analytics = () => {
  const stats = [
    {
      icon: Users,
      title: "Active Users",
      value: "2.4M+",
      growth: "+15%",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      hoverBorder: "hover:border-blue-200",
    },
    {
      icon: Briefcase,
      title: "Jobs Posted",
      value: "150K+",
      growth: "+22%",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      hoverBorder: "hover:border-purple-200",
    },
    {
      icon: Target,
      title: "Successful Hires",
      value: "89K+",
      growth: "+18%",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      hoverBorder: "hover:border-emerald-200",
    },
    {
      icon: TrendingUp,
      title: "Match Rate",
      value: "94%",
      growth: "+8%",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      hoverBorder: "hover:border-orange-200",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-semibold shadow-sm">
            Platform Performance
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            Numbers That{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Matter
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            See how our platform connects professionals and companies to create
            meaningful career opportunities.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl ${stat.hoverBorder} transition-all duration-300`}
            >
              {/* Icon + Growth */}
              <div className="flex items-center justify-between mb-7">
                <div
                  className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>

                <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1.5 rounded-full">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {stat.growth}
                </div>
              </div>

              {/* Value */}
              <div className="text-3xl font-extrabold text-gray-900 mb-2">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-sm text-gray-500 font-medium">
                {stat.title}
              </div>

              {/* Bottom line */}
              <div className="mt-5 h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500">
            Growing every day with professionals and companies around the
            world.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Analytics;