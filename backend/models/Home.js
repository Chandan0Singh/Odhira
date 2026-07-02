const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    hero: {
      title: {
        type: String,
        default: "",
      },

      subtitle: {
        type: String,
        default: "",
      },

      buttonText: {
        type: String,
        default: "",
      },

      buttonLink: {
        type: String,
        default: "",
      },

      images: [
        {
          image: String,
          alt: {
            type: String,
            default: "",
          },
        },
      ],
    },

    brandStory: {
      title: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      buttonText: {
        type: String,
        default: "",
      },

      buttonLink: {
        type: String,
        default: "",
      },

      image: {
        type: String,
        default: "",
      },
    },

    instagram: [
      {
        image: String,
        link: String,
      },
    ],

    newsletter: {
      title: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Home", homeSchema);
