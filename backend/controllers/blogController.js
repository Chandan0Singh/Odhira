const Blog = require("../models/blogSchema");
const fs = require("fs");
const path = require("path");

const createBlog = async (req, res) => {
  try {
    const { title, category, content, status, description } = req.body;

    let featuredImage = "";

    // image upload
    if (req.file) {
      featuredImage = req.file.path;
    }

    const blog = await Blog.create({
      title,
      category,
      description,
      content,
      status,
      featuredImage,
    });

    res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);

    res.status(200).json({
      success: true,
      count: blogs.length,
      totalViews,
      data: blogs,
    });
  } catch (error) {
    res.status(500).josn({
      success: false,
      message: error.message,
    });
  }
};

const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      status: "Published",
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { blogid } = req.body;

    if (!blogid) {
      return res.status(400).json({
        success: false,
        message: "required blog id",
      });
    }

    // Find blog
    const blog = await Blog.findById(blogid);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "blog doesn't exist",
      });
    }

    // Delete image
    if (blog.featuredImage) {
      // Remove starting slash
      const imagePath = path.join(
        __dirname,
        "..",
        blog.featuredImage.replace(/^\/+/, ""),
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.log("Image not found");
      }
    }

    // Delete blog
    await Blog.findByIdAndDelete(blogid);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, category, content, featuredImage, status } =
      req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "blog id required",
      });
    }

    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
        featuredImage,
        content,
        category,
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.log("CASDca", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const filterBlogs = async (req, res) => {
  try {
    const { search = "", category = "", status = "" } = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },

        {
          description: {
            $regex: search,
            $options: "i",
          },
        },

        {
          content: {
            $regex: search,
            $options: "i",
          },
        },

        {
          category: {
            $regex: search,
            $options: "i",
          },
        },

        {
          author: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Filter by category
    if (category && category !== "All Categories") {
      filter.category = category;
    }

    // Filter by status
    if (status && status !== "All Status") {
      filter.status = status;
    }

    const blogs = await Blog.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Find blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.views += 1;
    await blog.save();

    // Response
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  filterBlogs,
  getSingleBlog,
  getPublishedBlogs,
};
