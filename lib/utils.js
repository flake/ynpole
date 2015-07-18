/* Review of User(_id) for a Post(object) */
getReview = function(post, userId){
	if(_.findWhere(post.yes_voters, { "voter_id": userId }))
		return "YES";
	if(_.findWhere(post.no_voters, { "voter_id": userId }))
		return "NO";

	return false;
}

findReview = function(postId, userId){
	if(Posts.find({$and: [{_id: postId}, {"no_voters.voter_id":userId}]}).count())
		return "NO";
	if(Posts.find({$and: [{_id: postId}, {"yes_voters.voter_id":userId}]}).count())
		return "YES";
	else
		return false;
}

validateEmail = function(email){
	if(!email || email == '' || email == 'undefined')
		return false;

	var emailRe = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailRe.test(email);
}

validatePassword = function(password){
	var pwdRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // minimum 6 chars & 1 uppercase & 1 lowercase & 1 numeric
	if(password.match(pwdRe))
		return true;
	else
		return false;
}

validateAlpha = function(str){
	var alpha = /^[A-Za-z]+$/;
	str = str.replace(/\s+/g, '');
	if(str.match(alpha))
		return true;
	else
		return false;
}

validateDate = function(date){
	var dateRe = /^(\d{4})-(\d{1,2})-(\d{1,2})$/; //YYYY-MM-DD

	if(date == '')
		return false;
	if(regs = date.match(dateRe)){
		if(regs[1] < 0)
			return false; // not a valid year
		if(regs[2] < 1 || regs[2] > 12)
			return false; // not a valid month
		if(regs[3] < 1 || regs[3] > 31)
			return false; // not a valid day
	}else{
		return false; // not a valid date format
	}

	return true;
}

validateDob = function(dob){
	var minYear = 1900;
	var maxYear = (new Date()).getFullYear();

    var cdob = new Date(dob);
    var cdate = new Date();

    if(cdob > cdate)
    	return false;

    return validateDate(dob);
}

toTitleCase = function(str){
    return str.replace(/(?:^|\s)\w/g, function(match){
        return match.toUpperCase();
    });
}

prettyJSON = function(obj){
	console.log(JSON.stringify(obj, null, 2));
}

base64_encode = function(data) {
  //  discuss at: http://phpjs.org/functions/base64_encode/
  // original by: Tyler Akins (http://rumkin.com)
  // improved by: Bayron Guevara
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Rafał Kukawski (http://kukawski.pl)
  // bugfixed by: Pellentesque Malesuada
  //   example 1: base64_encode('Kevin van Zonneveld');
  //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  //   example 2: base64_encode('a');
  //   returns 2: 'YQ=='

  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

ownsDocument = function(userId, doc){
	return doc && doc.userId === userId;
}