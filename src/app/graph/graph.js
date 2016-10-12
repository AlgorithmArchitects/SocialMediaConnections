import React, { Component } from 'react';
import * as d3 from 'd3';
import './graph.css';
import FacebookLogin from 'react-facebook-login';


class Graph extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {personNodes: [], twitter_screen_name: null};
    this.changeTwitterScreenName = this.changeTwitterScreenName.bind(this);
    this.submitTwitter = this.submitTwitter.bind(this);
  }
  changeTwitterScreenName(e){
    this.setState({twitter_screen_name: e.target.value});
  }
  submitTwitter(e){
    e.preventDefault();
    fetch('/twitter?screen_name=' + this.state.twitter_screen_name)
        .then(response => response.json())
        .then(data => this.twitterDataToNodes(data))
        .catch(err => console.error(err));
  }
  twitterDataToNodes(data){
      console.log(data);
      var personNodes = this.state.personNodes.filter(function(item, idx){
          if(item.Site !== 'Twitter'){
              return item;
          }
          return null;
      });
      for(var i = 0; i < data.length; i++){
          personNodes.push({Name: data[i].name, Site: 'Twitter', Location: data[i].location});
      }
      console.log(personNodes);
      this.setState({personNodes: personNodes});
      this.removeGraph();
      this.createGraph();
  }
  componentDidMount(){
      this.createGraph();
  }
  removeGraph(){
    d3.select(".graph svg").remove();
  }
  createGraph(){

    var links = [
    ];

    var PersonNodes = this.state.personNodes;
    var locations = [];
    var nodes = {};
    // Compute the distinct links from the nodes.
    PersonNodes.forEach(function(node) {
      var link = {source: node.Site, target: node.Name + ',' + node.Location, type: "networkLink"};
      links.push(link);
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});

	  if(node.Location != null && node.Location !== "")
	  {
        if(locations[node.Location] == null)
        {
          locations[node.Location] = [];
        }
        else
        {
          locations[node.Location].forEach(function(person)
          {
            var locLink = {source: person, target: node.Name + ',' + node.Location, type: "locationLink"};
            links.push(locLink);
    	    locLink.source = nodes[locLink.source] || (nodes[locLink.source] = {name: locLink.source});
            locLink.target = nodes[locLink.target] || (nodes[locLink.target] = {name: locLink.target});
          });
        }
        locations[node.Location].push(link.target.name);
	  }
    });

    var width = window.innerWidth,
        height = window.innerHeight;

    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(60)
        .charge(-300)
        .on("tick", tick)
        .start();

    var svg = d3.select(".graph").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Per-type markers, as they don't inherit styles.
    svg.append("defs").selectAll("marker")
        .data(["networkLink", "locationLink"])
      .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
      .append("path")
        .attr("d", "M0,-5L10,0L0,5");

    var path = svg.append("g").selectAll("path")
        .data(force.links())
      .enter().append("path")
        .attr("class", function(d) { return "link " + d.type; })
        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

    var circle = svg.append("g").selectAll("circle")
        .data(force.nodes())
      .enter().append("circle")
        .attr("r", 6)
        .call(force.drag);

    var text = svg.append("g").selectAll("text")
        .data(force.nodes())
      .enter().append("text")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(function(d) { return d.name; });

    function tick() {
      path.attr("d", linkArc);
      circle.attr("transform", transform);
      text.attr("transform", transform);
    }

    function linkArc(d) {
      var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    }

    function transform(d) {
      return "translate(" + d.x + "," + d.y + ")";
    }
  }
  facebookLogin(response){
    console.log(response);
    fetch('/facebook?accessToken=' + response.accessToken + "&id=" + response.id)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitTwitter}>
            <input name="twitter_screen_name" ref="twitter_screen_name" onChange={this.changeTwitterScreenName} placeholder="Twitter screenname"/>
            <input type="submit" value="Submit" />
        </form>
        <FacebookLogin
            appId="198380237257114"
            scope="public_profile"
            autoLoad={true}
            fields="name,email,picture,friends"
            callback={this.facebookLogin}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
          />
        <div className="graph">
        </div>
      </div>
    );
  }
}

export default Graph;
