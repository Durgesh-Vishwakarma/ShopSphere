import cloudinary from '../config/cloudinary.js';

const getCloudinaryPublicId = (imageUrl) => {
  if (!imageUrl) return null;

  try {
    const url = new URL(imageUrl);

    if (!url.hostname.includes('cloudinary.com')) {
      return null;
    }

    const match = url.pathname.match(/\/upload\/(?:v\d+\/)?(.+)\.(?:jpg|jpeg|png|webp|gif|avif)$/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

const buildCloudinaryUrl = (publicId, width) =>
  cloudinary.url(publicId, {
    width,
    crop: 'limit',
    quality: 'auto',
    fetch_format: 'auto',
    secure: true,
  });

const buildImageVariants = (imageUrl) => {
  if (!imageUrl) return null;

  const publicId = getCloudinaryPublicId(imageUrl);

  if (!publicId) {
    return {
      original: imageUrl,
      thumb: imageUrl,
      card: imageUrl,
      carousel: imageUrl,
      full: imageUrl,
    };
  }

  return {
    original: imageUrl,
    thumb: buildCloudinaryUrl(publicId, 200),
    card: buildCloudinaryUrl(publicId, 480),
    carousel: buildCloudinaryUrl(publicId, 1200),
    full: buildCloudinaryUrl(publicId, 1600),
  };
};

export { buildImageVariants };
