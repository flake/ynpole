/* Review of User(_id) for a Post(object) */
getReview = function(post, userId){
	if(_.findWhere(post.yes_voters, { "voter_id": userId }))
		return "YES";
	if(_.findWhere(post.no_voters, { "voter_id": userId }))
		return "NO";

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