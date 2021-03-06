
function process(data) {
  data.sort(function(a,b) {return a.event.id - b.event.id; });
  
  var d;
  var nameId;
  for(var i = 0; i < data.length; i++) {
    d = data[i];
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

    var node_center = d.event.id + "_" + d.attended;
    node = {
      id: nameId,
      //radius: radius_scale(parseInt(d.total_amount, 10)),
      //value: d.total_amount,
      name: d.member? d.member.name : "",
      //group: d.group,
      //year: d.start_year,
      x: meetup_centers[node_center].x + Math.random() * 20,
      y: meetup_centers[node_center].y + Math.random() * 20,
      //x: Math.random() * 900,
      //y: Math.random() * 800,
      //meetup: d.event_id,
      attended: d.attended, //ADDED
      //node_score: nodeScore,
      node_centers: node_center
    };
    
    var member = memberLookup[nameId];
    if(!member) {
      member = memberLookup[nameId] = {};
      member.id = nameId;
      member.score = d.attended ? nodeScore : nodeScore;
      member.nodes = [node];
      member.data = d;
    } else {
      member.score += nodeScore;
      member.nodes.push(node);
    }
    
    nodes.push(node);
  }
  
  for(key in memberLookup) {
    var member = memberLookup[key];
    if(member.nodes.length > 1) {
      memberList.push(member)
    }
  }

} // end of process function

