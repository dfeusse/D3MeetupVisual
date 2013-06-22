
function process(data) {
  data.sort(function(a,b) {return b.attendedAt - a.attendedAt; });
  data.forEach(function(d) {
    var nameId;
    if (d.member && d.member.member_id)
    {
      nameId = "id_" + d.member.member_id;
    } else {
      //we still want to have a unique id for these nodes. luckily the database assigned one already!
      nameId = "id_" + d._id;
    }

    var nodeScore;
    if (d.attended) 
    {
      nodeScore = 1
    } else {
      nodeScore = -1;
    } 

    node = {
      id: nameId,
      //radius: radius_scale(parseInt(d.total_amount, 10)),
      //value: d.total_amount,
      name: d.member? d.member.name : "",
      //group: d.group,
      //year: d.start_year,
      x: Math.random() * 900,
      y: Math.random() * 800,
      //meetup: d.event_id,
      attended: d.attended, //ADDED
      node_centers: d.event.id + "_" + d.attended
    };
    
    var member = memberLookup[nameId];
    if(!member) {
      member = memberLookup[nameId] = {};
      member.id = nameId;
      member.score = d.attended ? nodeScore : nodeScore;
      member.nodes = [node];
    } else {
      member.score += nodeScore;
      member.nodes.push(node);
    }
    
    nodes.push(node);
  });
  
  for(key in memberLookup) {
    var member = memberLookup[key];
    if(member.nodes.length > 1) {
      memberList.push(member)
    }
  }

} // end of process function

