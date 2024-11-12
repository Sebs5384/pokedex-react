module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMocks.js',
        '\\.(ttf|otf|woff|woff2)$': '<rootDir>/__mocks__/fileMocks.js',
    },
};