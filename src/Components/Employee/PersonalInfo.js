import { HStack, Select, VStack, Input, Text, Button,useToast, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import employeeService from "../../services/employee.service";
import {
	BLOOD_GROUP_OPTIONS,
	MARITAL_STATUS_OPTIONS,
	NATIONALITY_OPTION,
	RELIGION_OPTION,
	GENDER_OPTION,
} from "./EmployeeData/personalData";
const PersonalInfo = () => {
	const [pin, setPin] = useState();
	const [salutation, setSalutation] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [fatherName, setFatherName] = useState();
	const [motherName, setMotherName] = useState();
	const [gender, setGender] = useState();
	const [birthDate, setBirthDate] = useState();
	const [birthPlace, setBirthPlace] = useState();
	const [bloodGroup, setBloodGroup] = useState();
	const [nationality, setNationality] = useState();
	const [religion, setReligion] = useState();
	const [maritalStatus, setMaritalStatus] = useState();
	const [spouseName, setSpouseName] = useState();
	const [numberOfSons, setNumberOfSons] = useState();
	const [numberOfDaughters, setNumberOfDaughters] = useState();
	const [cardNo, setCardNo] = useState();
	const [tinNo, setTinNo] = useState();
	const [passportNo, setPassportNo] = useState();
	const [drivingLicense, setDrivingLicense] = useState();
	const [nidNumber, setNidNumber] = useState();
	const [extraCurriculum, setExtraCurriculum] = useState();
	const [remarks, setRemarks] = useState();
	const [isAllDataAvailable, setIsAllDataAvailable] = useState(true);
	const [personalInfoDef, setPersonalInfoDef] = useState();
    const toast =  useToast();


	useEffect(()=>{
		employeeService.getProfileInfo().then((data)=>{
			debugger;
			if(data.response)
			{
				setPersonalInfoDef(data.profileInfo);
			}
			else {
				setIsAllDataAvailable(false);
			}
			
		});	
	}, [])

	const onUserPinChange = (e) => {
		let value = e.target.value;
		value = parseInt(value);
		setPin((prevUserPin) => (prevUserPin = value));
	};
	const onSalutationChange = (e) => {
		let value = e.target.value;
		setSalutation((prevSal) => (prevSal = value));
	};
	const onFirstChange = (e) => {
		let value = e.target.value;
		setFirstName((prevFirst) => (prevFirst = value));
	};
	const onLastChange = (e) => {
		let value = e.target.value;
		setLastName((prevLast) => (prevLast = value));
	};
	const onFatherNameChange = (e) => {
		let value = e.target.value;
		setFatherName((prevFather) => (prevFather = value));
	};
	const onMotherNameChange = (e) => {
		let value = e.target.value;
		setMotherName((prevMother) => (prevMother = value));
	};
	const onGenderChange = (e) => {
		let value = e.target.value;
		setGender((prevGender) => (prevGender = value));
	};
	const onBirthDateChange = (e) => {
		let value = e.target.value;
		value = new Date(value).toISOString();
		setBirthDate((prevDate) => (prevDate = value));
	};
	const onBirthPlaceChange = (e) => {
		let value = e.target.value;
		setBirthPlace((prevPlace) => (prevPlace = value));
	};
	const onBloodGroupChange = (e) => {
		let value = e.target.value;
		setBloodGroup((prevGroup) => (prevGroup = value));
	};
	const onNationalityChange = (e) => {
		let value = e.target.value;
		setNationality((prevNat) => (prevNat = value));
	};
	const onReligionChange = (e) => {
		let value = e.target.value;
		setReligion((prevRel) => (prevRel = value));
	};
	const onMaritalStatusChange = (e) => {
		let value = e.target.value;
		setMaritalStatus((prevStatus) => (prevStatus = value));
	};
	const onSpouseNameChange = (e) => {
		let value = e.target.value;
		setSpouseName((prevSpouse) => (prevSpouse = value));
	};
	const onSonsNumberChange = (e) => {
		let value = e.target.value;
		value = parseInt(value);
		setNumberOfSons((prevNum) => (prevNum = value));
	};
	const onDaughterNumChange = (e) => {
		let value = e.target.value;
		value = parseInt(value);
		setNumberOfDaughters((prevNum) => (prevNum = value));
	};
	const onCardNumberChange = (e) => {
		let value = e.target.value;
		value = parseInt(value);
		setCardNo((prevNo) => (prevNo = value));
	};
	const onTinNumberChange = (e) => {
		let value = e.target.value;
		value = parseInt(value);
		setTinNo((prevNo) => (prevNo = value));
	};
	const onPassportNumberChange = (e) => {
		let value = e.target.value;
		value = parseInt(value);
		setPassportNo((prevNo) => (prevNo = value));
	};
	const onDrivingLicenseChange = (e) => {
		let value = e.target.value;
		value = parseInt(value);
		setDrivingLicense((prevLicense) => (prevLicense = value));
	};
	const onNidNumberChange = (e) => {
		let value = e.target.value;
		value = parseInt(value);
		setNidNumber((prevNo) => (prevNo = value));
	};
	const onExtraCurrChange = (e) => {
		let value = e.target.value;
		setExtraCurriculum((prevCurr) => (prevCurr = value));
	};
	const onRemarksChange = (e) => {
		let value = e.target.value;
		setRemarks((prevRem) => (prevRem = value));
	};

	const onUpdateClick = () => {
		let updatedUser = {
			pin,
            salutation,
			firstName,
			lastName,
			fatherName,
			motherName,
            gender,
            birthDate,
            birthPlace,
            bloodGroup,
            nationality,
            religion,
            maritalStatus,
            numberOfSons,
            numberOfDaughters,
            cardNo,
            tinNo,
            passportNo,
            drivingLicense,
            nidNumber, extraCurriculum, remarks
		};

		if(maritalStatus === MARITAL_STATUS_OPTIONS[1].value){
			updatedUser = {...updatedUser, spouseName};
		}
	
       employeeService.updateProfileInfo(updatedUser).then((d)=>{
		if(d){
			toast({
                containerStyle: {
                    fontSize: "14px",
                    fontWeight: "normal"},
                title: 'Profile Updated.',
                position: "bottom-right",
                variant : "subtle",
                status: 'success',
                duration: 1000,
                isClosable: true,
              })
		}
	   })
	}

    const onCreateClick =()=>{
        let updatedUser = {
			pin,
            salutation,
			firstName,
			lastName,
			fatherName,
			motherName,
            gender,
            birthDate,
            birthPlace,
            bloodGroup,
            nationality,
            religion,
            maritalStatus,
            numberOfSons,
            numberOfDaughters,
            cardNo,
            tinNo,
            passportNo,
            drivingLicense,
            nidNumber, extraCurriculum, remarks
		};

		if(maritalStatus === MARITAL_STATUS_OPTIONS[1].value){
			updatedUser = {...updatedUser, spouseName};
		}
			
       employeeService.addProfileInfo(updatedUser).then((d)=>{
		if(d){
			toast({
                containerStyle: {
                    fontSize: "14px",
                    fontWeight: "normal"},
                title: 'Profile Saved.',
                position: "bottom-right",
                variant : "subtle",
                status: 'success',
                duration: 1000,
                isClosable: true,
              })
		}
	   })
    }

	return (
		<Flex layerStyle="pageStyle">
			<VStack  w="full" fontSize="14px" align = "flex-start">
				<Text fontWeight="bold" fontSize= "16px">Personal Information</Text>
				<HStack w="full">
					<VStack layerStyle="sectionStyle" align="flex-start">
						{/* pin input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Pin
							</Text>
							<Input
								size="sm"
								mr="1%"
								w="70%"
								placeholder="Enter your pin"
								type="number"
								defaultValue={personalInfoDef?.pin}
								onChange={onUserPinChange}
                                borderColor = "primary.200"
                                
							/>
						</HStack>
						{/* salutation input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Salutation
							</Text>
							<Input
								layerStyle="inputStyle"
								placeholder="Salutation"
								maxLength="60"
								defaultValue={personalInfoDef?.salutation}
								onChange={onSalutationChange}
							/>
						</HStack>
						{/* first name input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								First Name
							</Text>
							<Input
								layerStyle="inputStyle"
								defaultValue={personalInfoDef?.firstName}
								placeholder="Enter your first name"
								onChange={onFirstChange}
							/>
						</HStack>
						{/* last name input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Last Name
							</Text>
							<Input
								layerStyle="inputStyle"
								defaultValue={personalInfoDef?.lastName}
								placeholder="Enter your last name"
								onChange={onLastChange}
							/>
						</HStack>
						{/* father's name input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Father's Name
							</Text>
							<Input
								layerStyle="inputStyle"
								defaultValue={personalInfoDef?.fatherName}
								placeholder="Enter your father's name"
								onChange={onFatherNameChange}
							/>
						</HStack>
						{/* mother's name input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Mother's name
							</Text>
							<Input
								layerStyle="inputStyle"
								defaultValue={personalInfoDef?.motherName}
								placeholder="Enter your mother's name"
								onChange={onMotherNameChange}
							/>
						</HStack>
						{/* gender input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Gender
							</Text>
							<Select
								w="70%"
								onChange={onGenderChange}
							>  
								{GENDER_OPTION.map((option, index) => {
									let selected = false;
									if (personalInfoDef?.gender === option.value) 
									{
										selected = true;
									}
									return (
										<option
											key={index}
											value={option.value}
											selected = {selected}
										>
											{option.label}
										</option>
									);
								})}
							</Select>
						</HStack>
						{/* date of birth input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Date of Birth
							</Text>
							<Input
								layerStyle="inputStyle"
								defaultValue={personalInfoDef?.birthDate}
								type="date"
								onChange={onBirthDateChange}
							/>
						</HStack>
						{/* place of birth input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Place of Birth
							</Text>
							<Input
								layerStyle="inputStyle"
								placeholder="Location"
								defaultValue={personalInfoDef?.birthPlace}
								onChange={onBirthPlaceChange}
							/>
						</HStack>
						{/* blood group input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Blood Group
							</Text>
							<Select
								w="70%"
								onChange={onBloodGroupChange}
							>
								{BLOOD_GROUP_OPTIONS.map((option, index) => {
									let selected = false;
									if (personalInfoDef?.bloodGroup === option.value) 
									{
										selected = true;
									}
									return (
										<option
											key={index}
											value={option.value}
											selected = {selected}
										>
											{option.label}
										</option>
									);
								})}
							</Select>
						</HStack>
					</VStack>
					<VStack layerStyle="sectionStyle" align="flex-start">
						{/* nationality input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Nationality
							</Text>
							<Select
								w="70%"
								onChange={onNationalityChange}
							>
								{NATIONALITY_OPTION.map((option, index) => {
									let selected = false;
									if (personalInfoDef?.nationality === option.value) 
									{
										selected = true;
									}
									return (
										<option
											key={index}
											value={option.value}
											selected = {selected}
										>
											{option.label}
										</option>
									);
								})}
							</Select>
						</HStack>
						{/* religion input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Religion
							</Text>
							<Select
								w="70%"
								defaultValue={personalInfoDef?.religion}
								onChange={onReligionChange}
							>
								{RELIGION_OPTION.map((option, index) => {
									let selected = false;
									if (personalInfoDef?.religion === option.value) 
									{
										selected = true;
									}
									return (
										<option
											key={index}
											value={option.value}
											selected = {selected}
										>
											{option.label}
										</option>
									);
								})}
							</Select>
						</HStack>
						{/* marital status input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Marital Status
							</Text>
							<Select
								w="70%"
								defaultValue={personalInfoDef?.maritalStatus}
								onChange={onMaritalStatusChange}
							>
								{MARITAL_STATUS_OPTIONS.map((option, index) => {
									let selected = false;
									if (personalInfoDef?.maritalStatus === option.value) 
									{
										selected = true;
									}
									return (
										<option
											key={index}
											value={option.value}
											selected = {selected}
										>
											{option.label}
										</option>
									);
								})}
							</Select>
						</HStack>
						{/* spouse input */}
						{
							maritalStatus === "married" && (
								<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Spouse Name
							</Text>
							<Input
								layerStyle="inputStyle"
								placeholder="Name of spouse"
								defaultValue={personalInfoDef?.spouseName}
								onChange={onSpouseNameChange}
							/>
						</HStack>
							) 
						}
						{/* sons input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Sons
							</Text>
							<Input
								layerStyle="inputStyle"
								placeholder="Number of sons"
								defaultValue={personalInfoDef?.numberOfSons}
								type="number"
								onChange={onSonsNumberChange}
							/>
						</HStack>
						{/* daughter input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Daughter
							</Text>
							<Input
								layerStyle="inputStyle"
								placeholder="Number of daughter"
								defaultValue={personalInfoDef?.numberOfDaughters}
								type="number"
								onChange={onDaughterNumChange}
							/>
						</HStack>
						{/* card no input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Card No
							</Text>
							<Input
								layerStyle="inputStyle"
								defaultValue={personalInfoDef?.cardNo}
								placeholder="Enter card no"
								type="number"
								onChange={onCardNumberChange}
							/>
						</HStack>
						{/* TIN input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								TIN
							</Text>
							<Input
								layerStyle="inputStyle"
								placeholder="Enter TIN number"
								defaultValue={personalInfoDef?.tinNo}
								onChange={onTinNumberChange}
							/>
						</HStack>
						{/* passport number input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Passport No
							</Text>
							<Input
								layerStyle="inputStyle"
								placeholder="Enter passport number"
								defaultValue={personalInfoDef?.passportNo}
								type="number"
								onChange={onPassportNumberChange}
							/>
						</HStack>
						{/* driving license input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								Driving License
							</Text>
							<Input
								layerStyle="inputStyle"
								defaultValue={personalInfoDef?.drivingLicense}
								placeholder="Enter driving license"
								onChange={onDrivingLicenseChange}
							/>
						</HStack>
						{/* NID input */}
						<HStack layerStyle="inputStackStyle">
							<Text w="20%" >
								National ID
							</Text>
							<Input
								layerStyle="inputStyle"
								placeholder="Enter NID number"
								defaultValue={personalInfoDef?.nidNumber}
								type="number"
								onChange={onNidNumberChange}
							/>
						</HStack>
					</VStack>
				</HStack>
               <VStack w = "full">
                 {/* extra curriculum */}
				<HStack w="full" h="50%">
					<Text w="20%" >
						Extra Curriculum
					</Text>
					<Input
						size="lg"
						layerStyle="inputStyle"
						fontSize="14px"
						placeholder="hobbies, activities"
						defaultValue={personalInfoDef?.extraCurriculum}
						maxLength="70"
						onChange={onExtraCurrChange}
					/>
				</HStack>
                {/* remarks */}
				<HStack w="full" h="50%">
					<Text w="20%" >
						Remarks
					</Text>
					<Input
						layerStyle="inputStyle"
						placeholder="Remarks"
						maxLength="70"
						defaultValue={personalInfoDef?.remarks}
						onChange={onRemarksChange}
					/>
				</HStack>
               </VStack>
               <HStack layerStyle="pageButtonStyle">
				{(!isAllDataAvailable) ? 
                <Button fontWeight="normal" onClick={onCreateClick}>Create</Button>
				:
				<Button fontWeight="normal" onClick={onUpdateClick}>Update</Button>}
               </HStack>
			</VStack>
		</Flex>
	);
};
export default PersonalInfo;
