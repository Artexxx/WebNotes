var client = new Vue({
    el: '#clients',
    data: {
      clients: [
        {
          identifier: "000001",
          name: "Perry Williams",
          imageUrl: "./000004.jpeg",
          formattedDate: "Sept 28, 2021",
          formattedLastDue: "Due in 3 days",
          formattedAmount: "$29,000",
          status: "Active",
          role: "Admin",
        },{
          identifier: "000002",
          name: "Molly Sanders",
          imageUrl: "./000001.jpeg",
          formattedDate: "Sept 28, 2021",
          formattedLastDue: "Due in 3 days",
          formattedAmount: "$25,000",
          status: "Active",
          role: "Editor",
        },{
          identifier: "000003",
          name: "Michael Roberts",
          imageUrl: "./000002.jpeg",
          formattedDate: "Sept 25, 2021",
          formattedLastDue: "Due in 6 days",
          formattedAmount: "$214,000",
          status: "Pending",
          role: "Boss",
        },{
          identifier: "000004",
          name: "Lara Micholas",
          imageUrl: "./000003.jpeg",
          formattedDate: "Sept 14, 2021",
          formattedLastDue: "Due in 2 weeks",
          formattedAmount: "$11,200",
          status: "Inactive",
          role: "Investor",
        },{
          identifier: "000005",
          name: "Devin Childs",
          imageUrl: "./000004.jpeg",
          formattedDate: "Sept 6, 2021",
          formattedLastDue: "Due 3 weeks ago",
          formattedAmount: "$20,000",
          status: "Pending",
          role: "Admin",
        },{
          identifier: "000005",
          name: "Molly Sanders",
          imageUrl: "./000001.jpeg",
          formattedDate: "Sept 3, 2021",
          formattedLastDue: "Due 3 weeks ago",
          formattedAmount: "$13,000",
          status: "Active",
          role: "Sponsor",
        }
      ]
    }
  })