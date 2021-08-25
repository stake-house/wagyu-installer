# Wagyu
Wagyu (formerly known as StakeHouse) is an application aimed at lowering the technical bar to staking on Ethereum 2.0.


Dubbed a 'one-click installer', it provides a clean UI automating the setup and management of all the infrastructure necessary to stake without the user needing to have any technical knowledge.

[![wagyu preview](https://img.youtube.com/vi/-KKeZwI8EII/0.jpg)](https://www.youtube.com/watch?v=-KKeZwI8EII&ab_channel=ColfaxSelby)

## Disclaimer
Wagyu:
 - only runs on Ubuntu (see below for more system requirements)
 - is not audited - use at your own risk
 - is currently experimental and still under development
 - only runs on pyrmont (right now)
 - does not currently do anything with real ETH or mainnet (__DO NOT USE REAL ETH__)

## Demo
Wagyu (while it was known as StakeHouse) did a demo at the EthStaker Validator Workshop - take a look [here](https://youtu.be/cxP9gwapXJ0).

## Usage
There are no releases yet, please see the [setup](#setup) section under development to run the latest version.

## Getting Involved
Theres plenty left to do with Wagyu.  If you'd like to help out come join us on the [EthStaker](http://invite.gg/ethstaker) discord, channel #stakehouse, or reach out to Colfax (discord username: colfax#1983) directly.


Also try it out (feedback welcome!), take a look our demo above, and/or browse our open [issues](https://github.com/stake-house/wagyu/issues) (start by filtering by the label 'small').

## Development
### Requirements
 - Ubuntu 20.04
 - 16GB RAM
 - SSD with 200GB free
 - root access

### Setup
Wagyu is a React app running in Electron and currently *only runs on Ubuntu* (tested on version 20.04).  See `src/electron/` for the simple electron app and `src/react/` for where the magic happens.  Feedback and help is much encouraged so please reach out!

Start by cloning this repo and enter the directory by running `git clone https://github.com/stake-house/wagyu.git` and `cd wagyu`.  Then run the following:
 - `yarn install`
 - `yarn build` (or run `yarn run build:watch` in a separate terminal to hot reload your changes)
   - _If you are running with `build:watch` after saving your changes will automatically build.  In order to get them to show in the app press `ctrl+r` or `cmd+r`._
 - `yarn start`

### Installing Yarn on Ubuntu
Run the following commands:

1) `sudo apt update`
2) `sudo apt remove cmdtest yarn`
3) `sudo apt install npm`
4) `sudo npm install -g yarn`  

### Contribution Guidelines
To streamline contributions to React code within the Wagyu codebase, a small set of guidelines encapsulating our opinions is included here: 
1) Libraries - Use `styled-components` for css encapsulation, `rem` units for any pixel sizes (potentially via the utility library `polished`).
2) Typescript - Make generous use of everything typescript has to offer (don't use `any`... ever).
3) Formatting - This codebase uses `prettier` (rules defined in `.prettierrc`) for standardized code formatting. If using vscode, the formatter will run on save, if not, be sure to run `npx prettier --write "**/*.ts*"` to format the code.
4) Common components - Extract commonly used typography or UI elements into the `typography` directory.
5) Utility Functions - Keep utility functions that don't deal with rendering outside of components.
6) Other Opinions - Refrain from using 'render' functions within functional components. Extract this logic out into a separate component instead. Refrain from using `<br />` and use padding and/or margin instead.

Refer to this [React style guide](https://alexkondov.com/tao-of-react/) for more information.


## Support
Reach out to the EthStaker community:
 - on [discord](https://invite.gg/ethstaker)
 - on [reddit](https://www.reddit.com/r/ethstaker/)

## License
[GPL](LICENSE)

## Credits
 - Wagyu uses the [Rocket Pool](https://www.rocketpool.net/) installer to manage eth1/eth2 clients.
 - [EthStaker](https://www.reddit.com/r/ethstaker/) for the incredible guidance and support.
 - [Somer Esat](https://someresat.medium.com/)'s guides for the introductory knowledge.
