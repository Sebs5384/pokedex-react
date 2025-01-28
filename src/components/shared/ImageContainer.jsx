import PropTypes from 'prop-types';

function ImageContainer({ src, alt, className, onClick, dataAttribute }) {
    return (
        <img 
            src={src} 
            alt={alt} 
            className={className} 
            onClick={onClick}
            data-testid={dataAttribute}
        />
    );
};

ImageContainer.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default ImageContainer;