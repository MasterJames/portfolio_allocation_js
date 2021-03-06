/**
 * @file Functions related to most diversified portfolio.
 * @author Roman Rubsamen <roman.rubsamen@gmail.com>
 */

 
/* Start Wrapper private methods - Unit tests usage only */
/* End Wrapper private methods - Unit tests usage only */


/**
* @function globalMinimumVarianceWeights
*
* @summary Compute the weights of the global minimum variance portfolio.
*
* @description This function returns the weights w_1,...,w_n associated to the fully invested and long-only
* global minimum variance portfolio of n assets.
*
* This portfolio is Markowitz-efficient (i.e., it lies on the Markowitz efficient frontier) and is the portfolio
* with the lowest variance among all the feasible portfolios.
*
* This portfolio is unique, provided the covariance matrix of the assets is definite positive.
* 
* The algorithm used internally is a sequential minimization optimization algorithm,
* which is similar to a cyclical coordinate descent algorithm updating 2 coordinates at each iteration, 
* c.f. the first reference, and whose convergence is guaranteed as long as the covariance matrix
* is positive semi-definite
*
* In a previous version of the code, the algorithm used internally was a coordinate descent algorithm,
* c.f. the second reference, kept for historical reference.
*
* @see <a href="https://link.springer.com/article/10.1023/A:1012431217818">Keerthi, S. & Gilbert, E. Convergence of a Generalized SMO Algorithm for SVM Classifier Design Machine Learning (2002) 46: 351.</a>
* @see <a href="https://ssrn.com/abstract=2595051">Richard, Jean-Charles and Roncalli, Thierry, Smart Beta: Managing Diversification of Minimum Variance Portfolios (March 2015)</a>
* 
* @param {Matrix_|Array.<Array.<number>>} sigma the covariance matrix (sigma_ij),i,j=1..n of the n assets in the considered universe, square Matrix or array of n array of n real numbers statisfying sigma[i-1][j-1] = sigma_ij.
* @param {object} opt the optional parameters for the algorithm.
* @param {number} opt.eps the tolerance parameter for the convergence of the algorithm, a strictly positive real number; defaults to 1e-04.
* @param {number} opt.maxIter the maximum number of iterations of the algorithm, a strictly positive natural integer; defaults to 10000.
* @param {number} opt.constraints.minWeights an array of size n (l_i),i=1..n containing the minimum weights for the assets to include in the portfolio with 0 <= l_i, i=1..n; defaults to a n by 1 matrix made of zeros.
* @param {number} opt.constraints.maxWeights an array of size n (u_i),i=1..n containing the minimum weights for the assets to include in the portfolio with u_i <= 1, i=1..n; defaults to a n by 1 matrix made of ones.
* @return {Array.<number>} the weights corresponding to the global minimum variance portfolio, array of n real numbers.
*
* @example
* globalMinimumVarianceWeights([[0.0400, 0.0100], [0.0100, 0.0100]], {eps: 1e-10, maxIter: 10000});
* // XX
*/
self.globalMinimumVarianceWeights = function (sigma, opt) {
	// Decode options
	if (opt === undefined) {
		opt = { constraints: {} };
	}
	var eps = opt.eps || 1e-04;
	var maxIterations = opt.maxIter || 10000;
	var lowerBounds = opt.constraints.minWeights;
	var upperBounds = opt.constraints.maxWeights;
	
	// Convert sigma to matrix format
	var sigma = new Matrix_(sigma);
	
	// TODO: Checks, if enabled
	// Check that diagonal entries of sigma are strictly positive
	// Check that sigma is symmetric and positive definite
	// Check that sigma and rb are rows compatible
	// Check lower/upper bounds are finite, between 0 and 1

	// ------
	
	// Initializations
	var nbAssets = sigma.nbRows;
	var zeros = Matrix_.zeros(nbAssets, 1);
	var ones = Matrix_.ones(nbAssets, 1);
	
	
	// ----
	
	// The global minimum variance portfolio is the solution to a convex quadratic
	// program (e.g., the associated matrix is positive semi-definite, since this is
	// a covariance matrix).
	
		// Build the matrix and the vector of the quadratic program
	var Q = sigma;
	var p = zeros;
	
		// Build the linear equality constraint:
		// - Full investment
	var b = ones;
	var r = 1;
	
		// Build the bound constraints:
		// - By default, no short sales
		// - By default, absence of leverage
	var l = zeros;
	if (lowerBounds) {
		l = new Matrix_(lowerBounds);
	}
	var u = ones;
	if (upperBounds) {
		u = new Matrix_(upperBounds);
	}
	
		// Solve the quadratic program
	var sol = qpsolveGSMO_(Q, p, b, r, l, u, {eps: eps, maxIter: maxIterations});
	
	
	// ----
	
	// Extract the computed portfolio weights.
	var weights = sol[0];

	// Return the computed weights
	return weights.toArray();
}

