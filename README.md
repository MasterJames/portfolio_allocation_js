# PortfolioAllocation v0.0.5 ([Changelog](changelog.md))

[![Travis Build Status](https://travis-ci.org/lequant40/portfolio_allocation_js.svg?style=flat)](https://travis-ci.org/lequant40/portfolio_allocation_js)

PortfolioAllocation is a JavaScript library to allocate portfolios of fincancial assets, i.e. to compute the proportions of a given set of financial instruments (stocks, bonds, exchange traded funds - ETFs, mutual funds...) to hold in a portfolio so as to optimize specific quantitative criteria related to this portfolio.

PortfolioAllocation has been developed in JavaScript because I heavily use [Google Sheets](https://www.google.com/sheets/about/) to analyse trading strategies on my blog [Le Quant 40](http://www.lequant40.com/), as well as in my personal trading, and Google Sheets is easily extensible thanks to [Google Apps Script](https://developers.google.com/apps-script/), a JavaScript-based language.

Enjoy !


## Features

- Compatible with Google Sheets
- Compatible with any browser supporting ECMAScript 5 for front-end development
- Compatible with [Node.js](https://nodejs.org/) for back-end development
- Code continuously tested and integrated by [Travis CI](https://travis-ci.org/)
- Code heavily documented using [JSDoc](http://usejsdoc.org/)


## Supported portfolio allocation algorithms

- Equal weights (EW)  
  Analyzed by Victor DeMiguel and al. in their research paper [Optimal Versus Naive Diversification: How Inefficient is the 1/N Portfolio Strategy?](https://doi.org/10.1093/rfs/hhm075).

- Equal risk budgets, a.k.a. naive risk parity  
  Described by Raul Leote de Carvalho and al. in the research paper [Demystifying Equity Risk-Based Strategies: A Simple Alpha Plus Beta Description](https://doi.org/10.3905/jpm.2012.38.3.056).

- Equal risk contributions (ERC) and risk budgeting (RB)  
  Extensively studied by [Thierry Roncalli](http://www.thierry-roncalli.com/) and al in misc. research papers ([The properties of equally weighted risk contribution portfolios](https://doi.org/10.3905/jpm.2010.36.4.060), [Managing Risk Exposures Using the Risk Budgeting Approach](https://ssrn.com/abstract=2009778)...).

- Equal risk bounding (ERB)  
  Described in the research paper [Equal Risk Bounding is better than Risk Parity for portfolio selection](https://doi.org/10.1007/s10898-016-0477-6) by Francesco Cesarone and Fabio Tardella, the ERB portfolio is best described as an ERC portfolio possibly not containing all the assets in the considered universe.

- Cluster risk parity (CRP)  
  Discovered by [David Varadi](https://cssanalytics.wordpress.com/) and [Michael Kapler](http://systematicinvestor.wordpress.com/), it combines the usage of a clustering algorithm (for instance, the Fast Threshold Clustering Algorithm - FTCA - of David Varadi) with the ERC portfolio allocation algorithm.

- Most diversified portfolio (MDP)  
  Introduced in the research paper [Toward Maximum Diversification](https://doi.org/10.3905/JPM.2008.35.1.40) by [Yves Choueifaty](http://www.tobam.fr/yves-choueifaty/) and al.

- Minimum correlation algorithm (MCA)  
  Discovered by [David Varadi](https://cssanalytics.wordpress.com/), the MCA is meant to be an approximation of the MDP portfolio allocation algorithm.

- Global minimum variance (GMV)  
  The leftmost portfolio on the Markowitz mean-variance efficient frontier, which possesses the smallest attainable variance among all the mean-variance efficient portfolios.

- Proportional minimum variance algorithm (MVA)  
  Discovered by [David Varadi](https://cssanalytics.wordpress.com/), the MVA is meant to be an approximation of the GMV portfolio allocation algorithm.

- Minimax portfolio  
  Introduced by Martin Young in the research paper [A Minimax Portfolio Selection Rule with Linear Programming Solution](http://www.jstor.org/stable/2634472), this portfolio uses the minimum return as a measure of risk instead of the variance as in the Markowitz framework.

- Random portfolio  
  Random portfolios have several usages in finance, for instance measuring performances of asset allocation strategies as described by Patrick Burns in the article [Random Portfolios for Performance Measurement](https://doi.org/10.1007/3-540-36626-1_11).
 
  
## Supported helper algorithms
- Grid search of portfolio weights  
  This family of algorithms allows to determine numerically the weights of a portfolio minimizing a "desirability" criterion.
  
- Rounding of portfolio weights   
  The rounding algorithm described in the research paper [Rounding on the standard simplex: Regular grids for global optimization](https://doi.org/10.1007/s10898-013-0126-2) from Immanuel M. Bomze and al. allows to compute the closest rational weights to a portfolio (real) weights.


## Usage

### Usage in Google Sheets

If you would like to use PortfolioAllocation in Google Sheets, you can either:

- (Recommended) [Import the external Google Apps Script library](https://developers.google.com/apps-script/guide_libraries) with Script ID 1cTTAt3VZRZKptyhXtjF3EK-jKagdTUl6t29Pc7YidrC5m5ABR6LUy8sC into your spreadsheet script

or:

- Import the JavaScript files from the [dist/gs directory](https://github.com/lequant40/portfolio_allocation_js/tree/master/dist/gs) into your spreadsheet script

In both cases, providing data to the PortfolioAllocation functions is then accomplished your preferred way (c.f. the [PortfolioAnalytics JavaScript library README](https://github.com/lequant40/portfolio_analytics_js) for detailled examples):

- Using a wrapper function in your spreadsheet script, directly accessible from your spreadsheet, to which you can provide a standard data range (A1:A99...)
- Using pure Google Apps Script functions - typically the getRange(...) familly of functions -, optimized for speed
- ...

You can find examples of PortfolioAllocation usage in [this spreadsheet](https://docs.google.com/spreadsheets/d/1ScrwSjr9EgwXfRyPN4IaqVxZvDnqw-hWvVQcJ9Ak590). 


### Usage inside a browser

If you would like to use PortfolioAllocation inside a browser you can download [its source code](http://raw.github.com/lequant40/portfolio_allocation_js/master/dist/portfolio_allocation.dist.js) and/or [its minified source code](http://raw.github.com/lequant40/portfolio_allocation_js/master/dist/portfolio_allocation.dist.min.js).

You then just need to include this code in an HTML page to use it, e.g.:
```html
<script src="portfolio_allocation.dist.min.js" type="text/javascript"></script>
```


### Usage with Node.js

If you would like to use PortfolioAllocation with [Node.js](https://nodejs.org/en/), you simply need to declare it as a dependency of your project 
in your `package.json` file.

Then, this is standard Node.js code, e.g.:

```js
var PortfolioAllocation = require('portfolio-allocation');
...
var w = PortfolioAllocation.riskBudgetingWeights([[0.1,0], [0,0.2]], [0.25, 0.75]);
// w = [0.44948974243459944, 0.5505102575654006]
```


### Examples

#### Risk-based portfolio allocations

```js
PortfolioAllocation.equalWeights(5); 
// EW portfolio

PortfolioAllocation.equalRiskContributionWeights([[0.1, 0], [0, 0.2]]); 
// ERC portfolio

PortfolioAllocation.mostDiversifiedWeights([[0.1, 0], [0, 0.2]], {eps: 1e-10, maxIter: 10000});
// MDP portfolio

PortfolioAllocation.minCorrWeights([[0.1, 0], [0, 0.2]]);
// MCA portfolio

PortfolioAllocation.clusterRiskParityWeights([[0.1,0], [0,0.2]], {clusteringMode: 'ftca'});
// CRP portfolio
```


## How to contribute ?

### Fork the projet from [Github](https://github.com/)...


### Instal the [Grunt](http://gruntjs.com/) dependencies

```
npm install
```

### Develop...

### Compile

- The following command generates the files to be used inside a browser or with Node.js in the `dist` directory:

```
grunt deliver
```

- The following command generates the files to be used in Google Sheets in the `dist\gs` directory:

```
grunt deliver-gs
```

### Test

Any of the following two commands run the [QUnit](https://qunitjs.com/) unit tests contained in the `test` directory on the generated file `dist\portfolio_allocation.dev.min.js`:

```
npm test
```

```
grunt test
```

### Submit a pull-request...


## License

[MIT License](https://en.wikipedia.org/wiki/MIT_License)

