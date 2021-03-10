# Stakehouse
Stakehouse is an application aimed at lowering the technical bar to staking on Ethereum 2.0.


Dubbed a 'one-click installer', it provides a clean UI automating the setup and management of all the infrastructure necessary to stake without the user needing to have any technical knowledge.

![stakehouse preview](https://youtu.be/-KKeZwI8EII)

## Disclaimer
Stakehouse:
 - only runs on Ubuntu (see below for more system requirements)
 - is currently experimental - use at your own risk
 - only runs on pyrmont (right now)
 - does not currently do anything with real ETH or mainnet (__DO NOT USE REAL ETH__)

## Usage
There are no releases yet.  Please see Development section.

## Development
### Requirements
 - Ubuntu 20.04
 - 16GB RAM
 - SSD with 200GB free
 - root access

### Setup
Stakehouse is a React app running in Electron and currently *only runs on Ubuntu* (tested on version 20.04).  See `src/electron/` for the simple electron app and `src/react/` for where the magic happens.  Feedback and help is much encouraged so please reach out!

 - `yarn install`
 - `yarn run build:watch` in one terminal - this continually watches and builds your ts code and puts it in `./dist`
 - `yarn start` in another terminal - this runs your app (the code in `./dist`)

_If you make changes, save them and they will automatically build.  In order to get them to show in the app press `ctrl+r` or `cmd+r`_

## Support
Reach out to the EthStaker community:
 - on [discord](https://invite.gg/ethstaker)
 - on [reddit](https://www.reddit.com/r/ethstaker/)

## Getting Involved
Theres plenty left to do with Stakehouse.  If you'd like to help out, please give the app a try, take a look at the TODOs below, and reach out to Colfax on the EthStaker discord (username: colfax).  The TODO section is still under construction.

### TODOs
| Description | Priority | Size | Asignee |
| ----------- | -------- | ---- | ------- |
| Improve status monitoring logic, add Eth2 beacon syncing status, can we do it without accessing docker directly? | High | Medium |  |
| Eth2 Validator status - is it validating or not? Even if the validator is running  | High | Small |  |
| Check for Rocket Pool installation at load and redirect immediately to /status if installed | Medium | Small |  |
| General React audit by someone who is a more experienced React developer, including usage of child_process, error handling, etc | High | Medium |  |
| Alphabetize CSS | Medium | Small |  |
| General audit of error handling, edge cases | High | Medium |  |
| If install fails, give a descriptive error message and troubleshooting steps. | High | Medium |  |
| Make status indicators flash/dynamic in some way | Medium | Small |  |
| Support additional operating systems (depends on Rocket Pool support as well) | High | Large |  |
| Support picking Eth2 client (need to tie into client specific status monitoring) | High | Large |  |
| Improve install page/dynamic graphic.  Add more incremental statuses? | Medium | Small |  |
| Stop/start buttons for clients on status page. | Medium | Small |  |
| Update button for clients on status page. | Medium | Medium |  |
| Clean up logging/set up proper logging | High | Small |  |
| "Dry run" mode for testing/demos not on Ubuntu (does not run any actual commands) | High | Medium |  |
| Deposit screen - import validator keys and set up validator properly | Medium | Large |  |
| Display relevant info from Beaconcha.in on Status screen | Medium | Medium |  |
| Bundling of executable for users to download and open app | High | Small |  |
| Create a proper loading state for each page which only renders once all data is loaded | Medium | Small |  |
| OS check to make sure it doesnt run if not on Ubuntu | High | Small |  |
| Fix DeprecationWarning on startup | Low | ? |  |
| Installer "interface" implementation so it is extendable to handle multiple different installers | Medium | Large |  |
| More system check tests to see if the machine can run nodes | Medium | Medium |  |
| Suggestions for what to do if one of the system tests fails | Medium | Medium |  |
| Add port checking test hitting the port checker tool | Medium | Small |  |
| Support setting up nodes on remote host | Low | Large |  |
| TODOs in code | Various | Various | n/a |

## License
[GPL](LICENSE)

## Credits
 - Stakehouse uses the [Rocket Pool](https://www.rocketpool.net/) installer to manage eth1/eth2 clients.
 - [EthStaker](https://www.reddit.com/r/ethstaker/) for the incredible guidance and support.
 - [Somer Esat](https://someresat.medium.com/)'s guides for the introductory knowledge.
