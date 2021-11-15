const Queue = require("./Queue");

class StarshipEnterprise {
  constructor(officerId = null, officerName = null, reportTo = null) {
    this.officerId = officerId;
    this.officerName = officerName;
    this.reportTo = reportTo; // the officer that the new officer reports to
    this.leftReport = null;
    this.rightReport = null;
  }

  assignOfficer(officerId, officerName) {
    if (this.officerId == null) {
      this.officerId = officerId;
      this.officerName = officerName;
    } else if (officerId < this.officerId) {
        if (this.leftReport == null) {
          this.leftReport = new StarshipEnterprise(officerId, officerName, this);
        } else {
          this.leftReport.assignOfficer(officerId, officerName);
        }
    } else {
      if (this.rightReport == null) {
        this.rightReport = new StarshipEnterprise(officerId, officerName, this);
      } else {
        this.rightReport.assignOfficer(officerId, officerName);
      }
    }
  }

  findOfficersWithNoDirectReports(values = []) {
    if (!this.leftReport && !this.rightReport) {
      values.push(this.officerName)
    }
    if (this.leftReport) {
      values = this.leftReport.findOfficersWithNoDirectReports(values)
    }
    if (this.rightReport) {
      values = this.rightReport.findOfficersWithNoDirectReports(values)
    }
    
    return values;
  }

  listOfficersByExperience(officerNames = []) {
    if (this.leftReport) {
      officerNames = this.leftReport.listOfficersByExperience(officerNames);
    }

    officerNames.unshift(this.officerName);

    if (this.rightReport) {
      officerNames = this.rightReport.listOfficersByExperience(officerNames);
    }

    return officerNames;
  }
  
  

  listOfficersByRank(tree, rankedOfficers = {}) {
    // bfs
    // get depth of each node
    // create object based on height where key is height and value is an array of names
    
    const queue = new Queue();
    queue.enqueue(tree);
    let node = queue.dequeue();
    let rank = 1;
    rankedOfficers = { [rank]: [node.officerName] }
    while (node) {
      if (node.reportTo && 
          rankedOfficers[rank].includes(node.reportTo.officerName)) {
        rank = rank + 1;
        rankedOfficers[rank] = [node.officerName];
      }
      if (node.reportTo &&
          rankedOfficers[rank - 1].includes(node.reportTo.officerName) &&
          !rankedOfficers[rank].includes(node.officerName)) {
        rankedOfficers[rank] = [...rankedOfficers[rank], node.officerName];
      }
      if (node.leftReport) {
        queue.enqueue(node.leftReport); 
      }
      if (node.rightReport) {
        queue.enqueue(node.rightReport); 
      }
      node = queue.dequeue();
    }
    return rankedOfficers;
  }
}

module.exports = StarshipEnterprise;