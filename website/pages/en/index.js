/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig} = this.props;
    const {baseUrl} = siteConfig;

    const SplashContainer = (props) => (
      <div className="homeContainer header">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">
            <img width="200" src={`${baseUrl}img/hux-logo-white-new.svg`} />
            {props.children}
          </div>
        </div>
      </div>
    );

    const ProjectTitle = (props) => (
      <h2 className="projectTitle">
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = (props) => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = (props) => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
          <PromoSection>
            <Button href="https://huxjs.org/docs/overview">Get started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = (props) => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const QueryLanguage = () => (
      <Block id="try" background="light">
        {[
          {
            content:
              `Hux's query language allows you to only select what the UI needs from the store. It also gives you access to optimised filtering.`,
            image: `${baseUrl}img/undraw_house_searching_n8mp.svg`,
            imageAlign: 'left',
            title: 'Efficiently query your data',
          },
        ]}
      </Block>
    );

    const DataOptimisation = () => (
      <Block>
        {[
          {
            content:
              'Hux allows you to build highly performant UIs that don\'t degrade when handling large amounts of data. This is achieved through built-in data optimisation, multi-thread querying and processing and SWR-based caching.',
            image: `${baseUrl}img/undraw_visual_data_b1wx.svg`,
            imageAlign: 'right',
            title: 'Build highly performant UIs',
          },
        ]}
      </Block>
    );

    const Profiler = () => (
      <Block>
        {[
          {
            content:
              'The profiler will allow you to run test queries, hydrate your store with mock data and check performance metrics to help you locate bottlenecks',
            image: `${baseUrl}img/undraw_growth_analytics_8btt.svg`,
            imageAlign: 'right',
            title: 'Use the profiler to debug, test and locate bottlenecks',
          },
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <DataOptimisation />
          <QueryLanguage />
          <Profiler />
        </div>
      </div>
    );
  }
}

module.exports = Index;
