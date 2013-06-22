
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
      node_centers: d.event.id + "_" + d.attended
    };
    nodes.push(node);
  });
  nodes.sort(function(a,b) {return b.value - a.value; });
}