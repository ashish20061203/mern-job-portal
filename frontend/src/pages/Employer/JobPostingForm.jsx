import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  MapPin,
  IndianRupee,
  Briefcase,
  Users,
  Eye,
  Send,
  GraduationCap,
  CalendarDays,
  Code2,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import InputField from "../../components/inputs/InputField";
import SelectField from "../../components/inputs/SelectField";
import TextAreaField from "../../components/inputs/TextAreaField";
import JobPostingPreview from "../../components/cards/JobPostingPreview";

const JobPostingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",

    // Eligibility fields
    minCGPA: "",
    applicationDeadline: "",
    eligibleBranches: [],
    skills: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Convert comma separated input into array
  const handleArrayInputChange = (field, value) => {
    const values = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    // Remove duplicate values
    const uniqueValues = [...new Set(values)];

    handleInputChange(field, uniqueValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const jobPayload = {
      title: formData.jobTitle,
      description: formData.description,
      requirements: formData.requirements,
      location: formData.location,
      category: formData.category,
      type: formData.jobType,
      salaryMin: formData.salaryMin,
      salaryMax: formData.salaryMax,

      // Eligibility fields
      minCGPA: formData.minCGPA,
      applicationDeadline: formData.applicationDeadline,
      eligibleBranches: formData.eligibleBranches,
      skills: formData.skills,
    };

    try {
      const response = jobId
        ? await axiosInstance.put(
            API_PATHS.JOBS.UPDATE_JOB(jobId),
            jobPayload
          )
        : await axiosInstance.post(
            API_PATHS.JOBS.POST_JOB,
            jobPayload
          );

      if (response.status === 200 || response.status === 201) {
        toast.success(
          jobId ? "Job Updated Successfully!" : "Job Posted Successfully!"
        );

        setFormData({
          jobTitle: "",
          location: "",
          category: "",
          jobType: "",
          description: "",
          requirements: "",
          salaryMin: "",
          salaryMax: "",
          minCGPA: "",
          applicationDeadline: "",
          eligibleBranches: [],
          skills: [],
        });

        navigate("/employer-dashboard");
        return;
      }

      console.error("Unexpected Response:", response);
      toast.error("Something went wrong, please try again");
    } catch (error) {
      if (error.response?.data?.message) {
        console.error("API Error:", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Unexpected Error:", error);
        toast.error("Failed to post/update job, please try again");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.jobTitle.trim()) {
      errors.jobTitle = "Job title is required";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.category) {
      errors.category = "Please select a category";
    }

    if (!formData.jobType) {
      errors.jobType = "Please select a job type";
    }

    if (!formData.description.trim()) {
      errors.description = "Job description is required";
    }

    if (!formData.requirements.trim()) {
      errors.requirements = "Job requirements are required";
    }

    if (!formData.salaryMin || !formData.salaryMax) {
      errors.salary = "Both minimum and maximum salary are required";
    } else if (
      parseInt(formData.salaryMin) >= parseInt(formData.salaryMax)
    ) {
      errors.salary =
        "Maximum salary must be greater than minimum salary";
    }

    // CGPA validation
    if (
      formData.minCGPA === "" ||
      formData.minCGPA === null ||
      formData.minCGPA === undefined
    ) {
      errors.minCGPA = "Minimum CGPA is required";
    } else if (
      parseFloat(formData.minCGPA) < 0 ||
      parseFloat(formData.minCGPA) > 10
    ) {
      errors.minCGPA = "CGPA must be between 0 and 10";
    }

    // Deadline validation
    if (!formData.applicationDeadline) {
      errors.applicationDeadline =
        "Application deadline is required";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const deadline = new Date(formData.applicationDeadline);
      deadline.setHours(0, 0, 0, 0);

      if (deadline < today) {
        errors.applicationDeadline =
          "Application deadline cannot be in the past";
      }
    }

    return errors;
  };

  const isFormValid = () => {
    const validationErrors = validateForm(formData);
    return Object.keys(validationErrors).length === 0;
  };

  useEffect(() => {
    if (!jobId) return;

    const fetchJobDetails = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.JOBS.GET_JOB_BY_ID(jobId)
        );

        const jobData = response.data;

        if (jobData) {
          setFormData({
            jobTitle: jobData.title || "",
            location: jobData.location || "",
            category: jobData.category || "",
            jobType: jobData.type || "",
            description: jobData.description || "",
            requirements: jobData.requirements || "",
            salaryMin: jobData.salaryMin || "",
            salaryMax: jobData.salaryMax || "",

            minCGPA:
              jobData.minCGPA !== undefined
                ? jobData.minCGPA
                : "",

            applicationDeadline:
              jobData.applicationDeadline
                ? jobData.applicationDeadline.split("T")[0]
                : "",

            eligibleBranches: Array.isArray(
              jobData.eligibleBranches
            )
              ? jobData.eligibleBranches
              : [],

            skills: Array.isArray(jobData.skills)
              ? jobData.skills
              : [],
          });
        }
      } catch (error) {
        console.error("Error fetching job details:", error);

        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        }
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (isPreview) {
    return (
      <DashboardLayout activeMenu="post-job">
        <JobPostingPreview
          formData={formData}
          setIsPreview={setIsPreview}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="post-job">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Post a New Job
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                  Fill out the form below to create your job posting
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPreview(true)}
                  disabled={!isFormValid()}
                  className="group flex items-center space-x-2 px-6 py-3 text-sm font-medium text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 border border-gray-200 hover:border-transparent rounded-xl transition-all duration-300 shadow-lg shadow-gray-100 hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Eye className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">

              {/* Job Title */}
              <InputField
                label="Job Title"
                id="jobTitle"
                placeholder="e.g., Senior Frontend Developer"
                value={formData.jobTitle}
                onChange={(e) =>
                  handleInputChange("jobTitle", e.target.value)
                }
                error={errors.jobTitle}
                required
                icon={Briefcase}
              />

              {/* Location */}
              <InputField
                label="Location"
                id="location"
                placeholder="e.g., Pune, Maharashtra"
                value={formData.location}
                onChange={(e) =>
                  handleInputChange("location", e.target.value)
                }
                error={errors.location}
                required
                icon={MapPin}
              />

              {/* Category & Job Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="Category"
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  options={CATEGORIES}
                  placeholder="Select a category"
                  error={errors.category}
                  required
                  icon={Users}
                />

                <SelectField
                  label="Job Type"
                  id="jobType"
                  value={formData.jobType}
                  onChange={(e) =>
                    handleInputChange("jobType", e.target.value)
                  }
                  options={JOB_TYPES}
                  placeholder="Select job type"
                  error={errors.jobType}
                  required
                  icon={Briefcase}
                />
              </div>

              {/* CGPA & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Minimum CGPA */}
                <div>
                  <label
                    htmlFor="minCGPA"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Minimum CGPA
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GraduationCap className="h-5 w-5 text-gray-400" />
                    </div>

                    <input
                      type="number"
                      id="minCGPA"
                      min="0"
                      max="10"
                      step="0.01"
                      placeholder="e.g., 7.5"
                      value={formData.minCGPA}
                      onChange={(e) =>
                        handleInputChange(
                          "minCGPA",
                          e.target.value
                        )
                      }
                      className={`w-full pl-10 pr-3 py-2.5 border ${
                        errors.minCGPA
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-colors duration-200`}
                    />
                  </div>

                  {errors.minCGPA && (
                    <div className="flex items-center space-x-1 text-sm text-red-600 mt-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.minCGPA}</span>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    Example: 7.5 means students below 7.5 CGPA are not eligible.
                  </p>
                </div>

                {/* Application Deadline */}
                <div>
                  <label
                    htmlFor="applicationDeadline"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Application Last Date
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarDays className="h-5 w-5 text-gray-400" />
                    </div>

                    <input
                      type="date"
                      id="applicationDeadline"
                      min={new Date()
                        .toISOString()
                        .split("T")[0]}
                      value={formData.applicationDeadline}
                      onChange={(e) =>
                        handleInputChange(
                          "applicationDeadline",
                          e.target.value
                        )
                      }
                      className={`w-full pl-10 pr-3 py-2.5 border ${
                        errors.applicationDeadline
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-colors duration-200`}
                    />
                  </div>

                  {errors.applicationDeadline && (
                    <div className="flex items-center space-x-1 text-sm text-red-600 mt-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.applicationDeadline}</span>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    Students will not be able to apply after this date.
                  </p>
                </div>
              </div>

              {/* Eligible Branches */}
              <div>
                <label
                  htmlFor="eligibleBranches"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Eligible Branches
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    type="text"
                    id="eligibleBranches"
                    placeholder="e.g., CSE, ECE, EEE"
                    value={formData.eligibleBranches.join(", ")}
                    onChange={(e) =>
                      handleArrayInputChange(
                        "eligibleBranches",
                        e.target.value
                      )
                    }
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Enter branches separated by commas. Leave blank if all branches are eligible.
                </p>
              </div>

              {/* Required Skills */}
              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Required Skills
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code2 className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    type="text"
                    id="skills"
                    placeholder="e.g., C++, React, SQL, MongoDB"
                    value={formData.skills.join(", ")}
                    onChange={(e) =>
                      handleArrayInputChange(
                        "skills",
                        e.target.value
                      )
                    }
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Enter required skills separated by commas.
                </p>
              </div>

              {/* Description */}
              <TextAreaField
                label="Job Description"
                id="description"
                placeholder="Describe the role and responsibilities..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange(
                    "description",
                    e.target.value
                  )
                }
                error={errors.description}
                helperText="Include key responsibilities, day-by-day tasks, and what makes this role exciting"
                required
              />

              {/* Requirements */}
              <TextAreaField
                label="Requirements"
                id="requirements"
                placeholder="List key qualifications and skills..."
                value={formData.requirements}
                onChange={(e) =>
                  handleInputChange(
                    "requirements",
                    e.target.value
                  )
                }
                error={errors.requirements}
                helperText="Include required skills, experience level, education, and any preferred qualifications"
                required
              />

              {/* Salary Range */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Salary Range
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <IndianRupee className="h-5 w-5 text-gray-400" />
                    </div>

                    <input
                      type="number"
                      placeholder="Min"
                      value={formData.salaryMin}
                      onChange={(e) =>
                        handleInputChange(
                          "salaryMin",
                          e.target.value
                        )
                      }
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <IndianRupee className="h-5 w-5 text-gray-400" />
                    </div>

                    <input
                      type="number"
                      placeholder="Max"
                      value={formData.salaryMax}
                      onChange={(e) =>
                        handleInputChange(
                          "salaryMax",
                          e.target.value
                        )
                      }
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                {errors.salary && (
                  <div className="flex items-center space-x-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.salary}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
               <button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting || !isFormValid()
                  }
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed outline-none transition-colors duration-200 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Publishing Job...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Publish Job
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobPostingForm;