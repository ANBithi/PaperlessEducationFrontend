use EducationSystem

db.getCollection("User").remove(
  { tenantId: ObjectId("5ce27805d4fa874f4cd36c40") },
  { justOnce: false }
);

db.getCollection("User").insert([
  {
    createdBy: "Root User",
    createdById: ObjectId("5cda427b69eade00019f5ea0"),
    createdAt: ISODate("2019-10-24T12:50:11.610Z"),
    modifiedBy: "Root User",
    modifiedById: ObjectId("5cda427b69eade00019f5ea0"),
    modifiedAt: ISODate("2019-10-24T12:50:11.610Z"),
    firstName: "Root",
    lastName: "User",
    password:
      "AQAAAAEAACcQAAAAEJvzFHGBktyKeuVL7M/Bl8fj0PC7ewyUiHKcW8sOmKTPWMQYAjNdtVPsK2s35vtSJg==",
    email: "rootuser@paperless.edu",
    userType: NumberInt(1),
    isActive: true   
  }
]);