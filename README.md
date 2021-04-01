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

## Demo
StakeHouse did a demo at the EthStaker Validator Workshop - take a look [here](https://youtu.be/cxP9gwapXJ0).

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
Theres plenty left to do with StakeHouse.  If you'd like to help out come join us on the (EthStaker)[http://invite.gg/ethstaker] discord, channel #stakehouse or reach out to Colfax (discord username: colfax#1983) directly.


Also feel free to watch our demo above and/or browse our open (issues)[https://github.com/ethstaker-core/stakehouse/issues].

## License
[GPL](LICENSE)

## Credits
 - Stakehouse uses the [Rocket Pool](https://www.rocketpool.net/) installer to manage eth1/eth2 clients.
 - [EthStaker](https://www.reddit.com/r/ethstaker/) for the incredible guidance and support.
 - [Somer Esat](https://someresat.medium.com/)'s guides for the introductory knowledge.
