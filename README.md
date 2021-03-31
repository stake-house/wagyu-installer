# Stakehouse
Stakehouse is an application aimed at lowering the technical bar to staking on Ethereum 2.0.


Dubbed a 'one-click installer', it provides a clean UI automating the setup and management of all the infrastructure necessary to stake without the user needing to have any technical knowledge.

[![stakehouse preview](https://img.youtube.com/vi/-KKeZwI8EII/0.jpg)](https://www.youtube.com/watch?v=-KKeZwI8EII&ab_channel=ColfaxSelby)

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

### Installing Yarn on Ubuntu
Run the following commands:
1) `sudo apt remove cmdtest yarn`
2) `sudo apt install npm`
3) `sudo npm install -g yarn`  

## Support
Reach out to the EthStaker community:
 - on [discord](https://invite.gg/ethstaker)
 - on [reddit](https://www.reddit.com/r/ethstaker/)

## Getting Involved
Theres plenty left to do with Stakehouse.  If you'd like to help out, please give the app a try, take a look at the TODOs below, and reach out to Colfax on the EthStaker discord (username: colfax#1983).  The below secionts will soon be migrated to github issues.

### Product
| Description | Priority | Size | Asignee |
| ----------- | -------- | ---- | ------- |
| Migrate these TODOs to Github Issues | High | Medium | GreyWizard |

### Engineering
__New Features__
| Description | Priority | Size | Asignee |
| ----------- | -------- | ---- | ------- |
| Deposit screen - key generation, import validator keys, and set up validator properly | High | Large | colfax |
| Creating an executable for the application that users to download and click to open | High | Small |  |
| Ability to update client version through a button on the status page. | High | Medium |  |
| Eth2 Beacon Node status granualrity - stopped, syncing, online (currently only looks at docker status) | Low | Medium |  |
| Support picking Eth2 client, not just random selection | Low | Large |  |
| "Dry run" mode for testing/demos not on Ubuntu (does not run any actual commands) | Medium | Medium |  |
| Display relevant info from Beaconcha.in on Status screen | Medium | Medium |  |
| OS check to make sure it doesnt run if not on Ubuntu | Low | Small |  |
| More system check tests to see if the machine is powerful enough to run the nodes | Medium | Medium |  |
| Add port checking test hitting the port checker tool | Low | Small |  |
| Support running application on one host and setting up nodes on remote host | Low | Large |  |
| Support additional operating systems (depends on Rocket Pool support as well) | Low | Large |  |
| TODOs in code | Various | Various | n/a |


__Cosmetic__
| Description | Priority | Size | Asignee |
| ----------- | -------- | ---- | ------- |
| If install fails, give a descriptive error message and troubleshooting steps. | Medium | Medium |  |
| Make status indicators flash/dynamic in some way | Medium | Small |  |


__Engineering__
| Description | Priority | Size | Asignee |
| ----------- | -------- | ---- | ------- |
| General React audit by someone who is a more experienced React developer, including usage of child_process, error handling, etc | Medium | Medium |  |
| Installer "interface" implementation so it is extendable to handle multiple different installers | Medium | Large |  |
| Alphabetize/clean up CSS | Medium | Small |  |
| Fix DeprecationWarning on startup | Low | ? |  |
| Create a proper loading state for each page which only renders once all data is loaded | Medium | Small |  |
| Clean up logging/set up proper logging | Medium | Small |  |
| General audit of error handling, edge cases | Medium | Medium |  |

## License
[GPL](LICENSE)

## Credits
 - Stakehouse uses the [Rocket Pool](https://www.rocketpool.net/) installer to manage eth1/eth2 clients.
 - [EthStaker](https://www.reddit.com/r/ethstaker/) for the incredible guidance and support.
 - [Somer Esat](https://someresat.medium.com/)'s guides for the introductory knowledge.
