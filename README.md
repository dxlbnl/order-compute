Hey!

Welcome to our  newly started UI project. We're building an interface using web technologies that allows our users to easily order compute resources in the cloud for running their scientific algorithms to change the world :).


Live preview: [HERE](https://neoel.github.io/order-compute/public)

Issues:
  - []: Inconsistent api in proposal (unit_price vs unitPrice)
  - []: Currencies should be decoupled from pricing units (always euro f.i.)
  - []: Should specify all possible 't' values.
  - []: Is the compute price of a core per core or per unit?

Ideas:
  - []: Vertical bar sliders?
  - []: Coloring the resources
  - []: Show a circle graph to compare resource priorities
  - []: Time guesstimation based on a compute profile


This pull request should result in the creation of a UI component that makes it simple for these users to pick the right amount of compute resources of each type: RAM, vCPU and Storage. The users are Geo/Hydro/Bio tech engineers and although well-educated, they are not very knowledgable about the world of (virtual) cloud hardware and the resources involved. Yet we would like to provide them with a component that allows them to decide on how much they will order of each resource. We think that they would like to base this decision on the total cost of the resource for the duration of a certain project.

![image](https://cloud.githubusercontent.com/assets/184876/19804140/ce037414-9d0c-11e6-8235-112a38dabf2b.png)

We're thinking about a concept that involves a slider for each resource and some way of specifying the duration of their project. Then the the total cost of the project will be shown by the component, but if you have any better ideas feel free to experiment!

We currently have the following specs
- RAM should be in whole number GiB: `16GiB`
- vCPU should be in number with a single digit fraction: `3,5 vCPU cores`
- Storage should be in whole number GB: `500GB`

We know the following from the user:
- Initially they will be from the EU but we expect International customers in the future
- We expect most of our customers to be on Windows 7 (due to their legacy algorithms)
- The duration of a project can range from a few days to a few month
- We expect them to rent the compute resources for the full duration of the project

In terms of technologies to use:
- We settled on React for the view layer, for others layers the options are still open
- We're thinking of following Google's Material design language but this is still open
- The backend is not yet operational but you can expect their to be a RESTful endpoint that returns the current pricing:

```
GET /v1/prices

[{
  "nerdalize": {
     "ram": {
            "unit_price": 0.01,
            "unit": "GB",
            "t": "hour",
            "currency": "euro
     },
     "cpu": {
            "unitPrice": 0.02
            "unit": "core",
            "t": "hour",
            "currency": "euro
     },
     "storage": {
            "unitPrice": 0.02,
            "unit": "GB",
            "t": "hour",
            "currency": "euro
     }
  }
}]
```
