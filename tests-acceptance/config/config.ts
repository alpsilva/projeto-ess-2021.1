import { browser, Config } from 'protractor';

export let config: Config = {

    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    SELENIUM_PROMISE_MANAGER: false,

    capabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
            'args': ['--headless']
           }
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../../features/*'
    ],

    onPrepare: () => {

        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();

    },
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        strict: true,
        format: ['pretty'],
        require: ['../../stepdefinitions/*.ts'],
    }
};