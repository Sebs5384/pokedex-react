import PropTypes from 'prop-types';

function ImageContainer({ src, alt, className, onClick = () => {} }) {
    return (
        <img src={src} alt={alt} className={className} onClick={onClick} />
    );
};

export default ImageContainer;