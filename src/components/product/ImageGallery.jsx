import { useState } from 'react';

function ImageGallery({ images, title }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div>
      <div className="border rounded-3 mb-3 d-flex align-items-center justify-content-center bg-body-secondary bg-opacity-25" style={{ height: '420px' }}>
        <img
          src={activeImage}
          alt={title}
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          className="p-4"
        />
      </div>

      <div className="d-flex gap-2 overflow-auto pb-1">
        {images.map((image, index) => (
          <button
            key={image + index}
            className={`btn p-1 border rounded-2 ${activeImage === image ? 'border-primary border-2' : ''}`}
            style={{ flex: '0 0 auto' }}
            onClick={() => setActiveImage(image)}
          >
            <img src={image} alt={`${title} view ${index + 1}`} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
