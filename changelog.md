### 0.0.6 - XX/YY/2018

### 0.0.5 - 02/04/2018
- Misc. Matrix/Vector operations additions/refactor (in particular, toDoubleArray method replaced by toRowArray)
- Added two iterative linear system solvers (least square sense): Kaczmarz extended method and randomized Kaczmarz extended method
- Added a feasible/bounded linear program solver: primal dual hybrid gradient algorithm
- New portfolio allocation methods: Random Portfolio, Minimax Portfolio
- Updated portfolio allocation helper method to round portfolio weights 
- Added a quadratic program solver: generalized sequential minimization optimization
- Added a continuous quadratic knapsack problem solver using a breakpoint searching algorithm
- Updated GMV and MDP portfolios to use the quadratic program solver
- Updated GMV to manage assets weights constraints
- Added a version of the select algorithm from Floyd and Rivest
- Added a median finding algorithm, using the select algorithm from Floyd and Rivest
- Optimized the ERC and ERB portfolio allocation algorithms, going from ~5 minutes to find the ERB portfolio for 20 assets to ~30 seconds

### 0.0.4 - 01/12/2017
- Misc. Matrix/Vector operations additions/refactor
- New portfolio allocation methods: Equal Risk Bounding, Global Minimum Variance, Grid Search
- New portfolio allocation helper method: "optimal" floating-point portfolio weights transformation to rational portfolio weights

### 0.0.3 - 10/09/2017
- Misc. Matrix/Vector operations additions/refactor
- New portfolio allocation method: Cluster Risk Parity, with a included clustering method: Fast Threshold Clustering Algorithm

### 0.0.2 - 24/06/2017

- New portfolio allocation methods: most diversified portfolio, minimum correlation portfolio, proportional minimum variance portfolio
- Included a covariance computation function using a corrected two pass formula
- New Matrix/Vector operations, plus code refactoring for future split

### 0.0.1 - 09/06/2017

- Initial commit
- Four portfolio allocation methods supported: equal weights, equal risk budget, equal risk contributions, risk budgeting
- Several Matrix/Vector basic operations implemented to support above algorithms
