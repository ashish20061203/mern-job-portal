import {
  Bookmark,
  Building2,
  Calendar,
  MapPin,
  GraduationCap,
  Clock,
  Code2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import StatusBadge from "../../components/StatusBadge";

const JobCard = ({ job, onClick, onToggleSave, onApply, saved, hideApply }) => {
  const { user } = useAuth();

  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (num >= 10000000)
        return `₹${(num / 10000000).toFixed(2)}Cr`;
      if (num >= 100000)
        return `₹${(num / 100000).toFixed(2)}L`;
      if (num >= 1000)
        return `₹${(num / 1000).toFixed(0)}k`;
      return `₹${num}`;
    };

    const monthlyMin = min / 12;
    const monthlyMax = max ? max / 12 : null;

    if (monthlyMax) {
      return `${formatNumber(monthlyMin)} – ${formatNumber(
        monthlyMax
      )} /mo`;
    } else {
      return `${formatNumber(monthlyMin)} /mo`;
    }
  };

  const isDeadlinePassed =
    job?.applicationDeadline &&
    moment().isAfter(moment(job.applicationDeadline));

  const formattedDeadline = job?.applicationDeadline
    ? moment(job.applicationDeadline).format("Do MMM YYYY")
    : null;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 group relative overflow-hidden cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {job?.company?.companyLogo ? (
            <img
              src={job?.company?.companyLogo}
              alt="Company Logo"
              className="w-14 h-14 object-cover rounded-xl border-4 border-white/20 shadow-lg"
            />
          ) : (
            <div className="w-14 h-14 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
          )}

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors leading-snug">
              {job?.title}
            </h3>

            <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
              <Building2 className="w-3.5 h-3.5" />
              {job?.company?.companyName}
            </p>
          </div>
        </div>

        {user && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Bookmark
              className={`w-5 h-5 hover:text-blue-600 ${
                job?.isSaved || saved
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            />
          </button>
        )}
      </div>

      {/* Basic Job Info */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
            <MapPin className="w-3 h-3" />
            {job?.location || "Not specified"}
          </span>

          <span
            className={`px-3 py-1 rounded-full font-medium ${
              job?.type === "Full-Time"
                ? "bg-green-100 text-green-800"
                : job?.type === "Part-Time"
                ? "bg-yellow-100 text-yellow-800"
                : job?.type === "Contract"
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {job?.type}
          </span>

          <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
            {job?.category}
          </span>
        </div>
      </div>

      {/* Eligibility Information */}
      {(job?.minCGPA > 0 ||
        job?.eligibleBranches?.length > 0 ||
        job?.skills?.length > 0) && (
        <div className="space-y-2.5 mb-4">
          {/* CGPA */}
          {job?.minCGPA > 0 && (
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <GraduationCap className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
              <span>
                <span className="font-semibold">Min CGPA:</span>{" "}
                {job.minCGPA}
              </span>
            </div>
          )}

          {/* Eligible Branches */}
          {job?.eligibleBranches?.length > 0 && (
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <GraduationCap className="w-4 h-4 mt-0.5 text-green-600 shrink-0" />
              <span>
                <span className="font-semibold">Branches:</span>{" "}
                {job.eligibleBranches.join(", ")}
              </span>
            </div>
          )}

          {/* Skills */}
          {job?.skills?.length > 0 && (
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <Code2 className="w-4 h-4 mt-0.5 text-purple-600 shrink-0" />
              <span>
                <span className="font-semibold">Skills:</span>{" "}
                {job.skills.join(", ")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Date Information */}
      <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Posted:{" "}
            {job?.createdAt
              ? moment(job.createdAt).format("Do MMM YYYY")
              : "N/A"}
          </span>

          {job?.applicationDeadline && (
            <span
              className={`flex items-center gap-1.5 ${
                isDeadlinePassed
                  ? "text-red-600"
                  : "text-orange-600"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {isDeadlinePassed ? "Expired: " : "Last Date: "}
              {formattedDeadline}
            </span>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-blue-600 font-semibold text-lg">
          {job?.salaryMin
            ? formatSalary(job.salaryMin, job.salaryMax)
            : "Salary not specified"}
        </div>

        {!saved && (
          <>
            {/* Existing Application Status */}
            {job?.applicationStatus ? (
              <StatusBadge status={job?.applicationStatus} />
            ) : (
              !hideApply && (
                <button
                  disabled={isDeadlinePassed}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!isDeadlinePassed) {
                      onApply();
                    }
                  }}
                  className={`text-sm px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold ${
                    isDeadlinePassed
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-50 to-blue-50 text-blue-700 hover:text-white hover:from-blue-500 hover:to-blue-600 transform hover:-translate-y-0.5 cursor-pointer"
                  }`}
                >
                  {isDeadlinePassed ? "Applications Closed" : "Apply Now"}
                </button>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;