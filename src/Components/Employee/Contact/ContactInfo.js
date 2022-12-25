import { HStack, VStack, Button, useToast, Flex } from "@chakra-ui/react";
import { useState, useEffect  } from "react";
import CurrentAddress from "./CurrentAddress";
import EmergencyContact from "./EmergencyContact";
import PermanentAddress from "./PermanentAddress";
import employeeService from "../../../services/employee.service";

const ContactInfo = () => {
	const [permanentAddressObj, setPermanentAddressObj] = useState();
	const [currentAddressObj, setCurrentAddressObj] = useState();
	const [emergencyContactObj1, setEmergencyContactObj1] = useState();
	const [emergencyContactObj2, setEmergencyContactObj2] = useState();
	const [emergencyDefValues, setEmergencyDefValues] = useState([]);
	const [currentAddressDef, setCurrentAddressDef] = useState();
	const [permanentAddressDef, setPermanentAddressDef] = useState();	
	const [isAllDataAvailable, setIsAllDataAvailable] = useState(true);
	const toast = useToast();
	useEffect(()=> {
		employeeService.getEmployeeAddress("permanent").then((data)=>{
			if(data.addressFound)
			{
				setPermanentAddressDef(data.permanentAddress);
			}
			else {
				setIsAllDataAvailable(false);
			}
			
		});	
		employeeService.getEmployeeAddress("present").then((data)=>{
			if(data.addressFound)
			{
				setCurrentAddressDef(data.presentAddress);
			}
			else {
				setIsAllDataAvailable(false);
			}
		});	
		employeeService.getEmployeeContact("emergency").then((data)=>{
			if(data.contactResponse)
			{
				setEmergencyDefValues(data.contacts);
			}
			else {
				setIsAllDataAvailable(false);
			}
		});	
	}, [])

	const onCreateClick = async () => {
		let addContactInfo = {
			permanentAddress: permanentAddressObj,
			currentAddress: currentAddressObj,
			emergencyContacts: [emergencyContactObj1, emergencyContactObj2],
		};
		if(addContactInfo.permanentAddress !== null && addContactInfo.permanentAddress !== undefined){
			debugger;
			await employeeService.addAddress(addContactInfo.permanentAddress, "permanent");
		}		
		if(addContactInfo.currentAddress !== null && addContactInfo.currentAddress !== undefined){
			console.log(addContactInfo.currentAddress);
			await employeeService.addAddress(addContactInfo.currentAddress, "present");
		}
		addContactInfo.emergencyContacts.map((emergencyContact)=>{
			if (emergencyContact === null || emergencyContact === undefined) {
				return;
			}
			return (
				employeeService.addContact(emergencyContact, "emergency").then((data) => {
					if (data?.success === true) {
					toast({
						containerStyle: {
							fontSize: "14px",
							fontWeight: "normal",
						},
						title: data.message,
						position: "bottom-right",
						variant: "subtle",
						status: "success",
						duration: 1000,
						isClosable: true,
					});
				}
			})
			)
		})

	}
	const onUpdateClick = () => {
		let updateContact = {
			permanentAddress: permanentAddressObj,
			currentAddress: currentAddressObj,
			emergencyContacts: [emergencyContactObj1, emergencyContactObj2],
		};
	
};

	return (
		<Flex layerStyle="pageStyle">
			<VStack w="full" h="100%" fontSize="14px" align="flex-start">
				<HStack w="full" align="start">
					<PermanentAddress
						permanentAddressObj={permanentAddressObj}
						setPermanentAddressObj={setPermanentAddressObj}
						defaultValues={permanentAddressDef}
					/>
					<CurrentAddress
						currentAddressObj={currentAddressObj}
						setCurrentAddressObj={setCurrentAddressObj}
						defaultValues={currentAddressDef}
					/>
				</HStack>
				<HStack w="full">
					<EmergencyContact
						emergencyContactObj={emergencyContactObj1}
						setEmergencyContactObj={setEmergencyContactObj1}
						defaultValues={emergencyDefValues[0]}
					/>
					<EmergencyContact
						emergencyContactObj={emergencyContactObj2}
						setEmergencyContactObj={setEmergencyContactObj2}
						defaultValues={emergencyDefValues[1]}
					/>
				</HStack>
				<HStack layerStyle="pageButtonStyle">
					{!isAllDataAvailable ? (
						<Button fontWeight="normal" onClick={onCreateClick}>
							Create
						</Button>
					) : (
						<Button fontWeight="normal" onClick={onUpdateClick}>
							Update
						</Button>
					)}
				</HStack>
			</VStack>
		</Flex>
	);
};
export default ContactInfo;
