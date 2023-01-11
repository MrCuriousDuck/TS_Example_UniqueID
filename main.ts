async function jobArrived(s: Switch, flowElement: FlowElement, job: Job) {
	let FlagJH_data = await s.getGlobalData(Scope.FlowElements, 'FlagJH', true);
	if (FlagJH_data != '') {
		let FlagJH_num = parseInt(FlagJH_data) + 1;
		FlagJH_data = FlagJH_num.toString();
	} else {
		FlagJH_data = '1';
	}
	await s.setGlobalData(Scope.FlowElements, 'FlagJH', FlagJH_data);

	let NewName = FlagJH_data + '_' + job.getName();
	await flowElement.log(LogLevel.Warning, 'Новое имя работы: ' + NewName);

	await job.sendToSingle(NewName);
}

async function flowStopTriggered(s: Switch, flowElement: FlowElement) {
	await s.removeGlobalData(Scope.FlowElements, 'FlagJH');
}
