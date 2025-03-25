import * as math from "mathjs";

/**
 * Linear Regression with Gradient Descent (Matrix Implementation)
 * @param {Array} X - Features array (2D array where each row is a sample)
 * @param {Array} y - Target values (1D array)
 * @param {number} learningRate - Learning rate for gradient descent
 * @param {number} iterations - Number of iterations to run
 * @returns {Object} - {mseHistory: Array, weights: Array}
 */
export function gradientDescentLinearRegression(
  X,
  y,
  learningRate,
  iterations
) {
  // Add bias term (column of 1s) to X
  const X_with_bias = X.map((row) => [1, ...row]);

  // Convert to matrix format
  const X_matrix = math.matrix(X_with_bias);
  const y_matrix = math.matrix(y);

  // Initialize weights (including bias term)
  let weights = math.zeros(X_with_bias[0].length);

  const m = X_with_bias.length; // Number of samples
  const mseHistory = [];

  for (let iter = 0; iter < iterations; iter++) {
    // Calculate predictions: X * weights
    const predictions = math.multiply(X_matrix, weights);

    // Calculate errors: predictions - y
    const errors = math.subtract(predictions, y_matrix);

    // Calculate gradient: (1/m) * X' * errors
    const gradient = math.multiply(
      1 / m,
      math.multiply(math.transpose(X_matrix), errors)
    );

    // Update weights: weights -= learningRate * gradient
    weights = math.subtract(weights, math.multiply(learningRate, gradient));

    // Calculate MSE: (1/m) * sum(errors^2)

    const mse = math.mean(math.sum(math.map(errors, math.square)));

    mseHistory.push(mse);
  }

  return {
    mseHistory: mseHistory,
    weights: weights.toArray(),
  };
}

/**
 * Linear Regression with Gradient Descent (Matrix Implementation)
 * @param {Array} X - Features array (2D array where each row is a sample)
 * @param {Array} y - Target values (1D array)
 * @param {number} learningRate - Learning rate for gradient descent
 * @param {number} iterations - Number of iterations to run
 * @returns {Object} - {mseHistory: Array, weights: Array}
 */
export function sequentialGradientDescentLinearRegression(
  X,
  y,
  learningRate,
  iterations
) {
  // Add bias term (column of 1s) to X
  const X_with_bias = X.map((row) => [1, ...row]);

  // Convert to matrix format
  const X_matrix = math.matrix(X_with_bias);
  const y_matrix = math.matrix(y);

  // Initialize weights (including bias term)
  let weights = math.zeros(X_with_bias[0].length);

  const m = X_with_bias.length; // Number of samples
  const mseHistory = [];

  for (let iter = 0; iter < iterations; iter++) {
    for (let index = 0; index < X_with_bias[0].length; index++) {
      // Calculate predictions: X * weights
      const predictions = math.multiply(X_matrix, weights);
      const errors = math.subtract(predictions, y_matrix);

      // Calculate gradient: (1/m) * X' * errors
      const gradient = (math
        .multiply(1 / m, math.multiply(math.transpose(X_matrix), errors)))
        .get([index]);
        
      // Update weights: weights -= learningRate * gradient
      weights.set([index],weights.get([index])-learningRate*gradient)
    }

    const predictions = math.multiply(X_matrix, weights);

    // Calculate errors: predictions - y
    const errors = math.subtract(predictions, y_matrix);

    // Calculate MSE: (1/m) * sum(errors^2)

    const mse = math.mean(math.sum(math.map(errors, math.square)));

    mseHistory.push(mse);
  }

  return {
    mseHistory: mseHistory,
    weights: weights.toArray(),
  };
}
