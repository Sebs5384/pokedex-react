import PropTypes from 'prop-types';

function ImageContainer({ src, alt, className, onClick = () => {}}) {
    return (
        <img 
            src={src} 
            alt={alt} 
            className={className} 
            onClick={onClick}
        />
    );
};

ImageContainer.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default ImageContainer;