<div align="center">
  <a href="https://twitter.com/intocryptoast">
    <img src="./toast_logo.png" alt="Logo" height="100">
  </a>
<h3>DCV Member Twitter Fetch</h3>
</div>

### deps

* [Twitter API v2](https://www.npmjs.com/package/twitter-api-v2)
* [axios](https://www.npmjs.com/package/axios)
* [sharp](https://www.npmjs.com/package/sharp)
* [dotenv](https://www.npmjs.com/package/dotenv)

<br>

### Installation

1. Get API Keys (readonly)  [https://developer.twitter.com/en/products/twitter-api](https://developer.twitter.com/en/products/twitter-api)

2. Clone the repo
   ```sh
   git clone https://github.com/toastdoteth/dcv-member-data.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API keys in `.env_sample` and rename file to `.env`

<br>

### Usage

First run will create `/images/banner`, `/images/profile` and `/json` folders.

`members.json` is created from fetched data and image files are downloaded to relavant folders.

Successive runs (manually done) check if images already exist and will only redownload if a member has updated their Twitter profile or banner image. `members.json` is rewritten on each run since the user object is stored in cache to check against each time.
