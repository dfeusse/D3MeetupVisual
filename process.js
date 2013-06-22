
function process(data) {
  data.forEach(function(d) {
    var nameId;
    if (d.member)
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
      //name: d.name,
      //group: d.group,
      //year: d.start_year,
      x: Math.random() * 900,
      y: Math.random() * 800,
      //meetup: d.event_id,
      attended: d.attended, //ADDED
      node_score: nodeScore, //ADDED
      //node_array: [],
      node_centers: d.event.id + "_" + d.attended
    };


    nodes.push(node);
  });
  nodes.sort(function(a,b) {return b.value - a.value; });

var node_object = {};
for (var i=0; i<nodes.length; i++) {
      var s = nodes[i];
      s = [s.id];
        }
    

/*
for (var i=0; i<nodes.length; i++) {
  var s = nodes[i];
  console.log(s.id);
  node_object.id = s.id
}
*/

} // end of process function


function nodeArrays(data) {
    data.forEach(function(d) {

    })
}