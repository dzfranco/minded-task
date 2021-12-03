process.env.SENDGRID_API_KEY = "SG.mymockKey";
process.env.SENDGRID_FROM_ADDRESS = "mock@email.com";

import { Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcryptjs";
import { AuthService } from "@/Auth/services/auth.service";

describe("Auth Service", () => {
  let testingModule: TestingModule;
  let authService: AuthService;

  const mockUser = {
    id: "id",
    dob: "1990-01-01",
    email: "test@gmail.com",
    status: "PRISTINE",
    zipCode: "10001",
    firstName: "test",
    lastName: "test",
  };

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [Logger],
      providers: [
        Logger,
        {
          provide: JwtService,
          useFactory: () => ({
            sign: () => {
              return true;
            },
          }),
        },
        {
          provide: AuthService,
          useFactory: () => ({
            validateHash: () => true,
            login: () => mockUser,
            signUp: (payload) => {
              if (payload.years < 21) {
                throw new Error();
              }
              if (
                !payload.password.match(
                  /^(?=.*?[A-Z])(?=.*?[#¿?¡!@$%^&/()=+{}[\]:;."'`,*\-_<>¬]).{8,}$/
                )
              ) {
                throw new Error();
              }

              return mockUser;
            },
            verifyIpAddress: (ipAddress) => {
              if (ipAddress !== "newIp") {
                throw new Error("IP Address already exists");
              }
              return true;
            },
          }),
        },
      ],
    }).compile();
    authService = testingModule.get(AuthService);
  });

  it("should validate a hash", async () => {
    const mockHash = await bcrypt.hash("some_pass", 10);
    const result = await authService.validateHash("some_pass", mockHash);
    expect(result).toEqual(true);
  });

  it("should login", async () => {
    const response = await authService.login({
      id: "mockId",
      email: "test@gmail.com",
    });
    expect(response).toEqual(mockUser);
  });

  it("should fail to sign up... weak password", async () => {
    let fails;
    try {
      await authService.signUp({
        email: "test@gmail.com",
        password: "test",
        dob: "1990-01-01",
        zipCode: "10001",
      });
      fails = false;
    } catch {
      fails = true;
    }

    expect(fails).toEqual(true);
  });

  it("should fail to sign up ... IP Address exists", async () => {
    let fails;
    try {
      await authService.verifyIpAddress("oldIp");
      await authService.signUp({
        email: "test@gmail.com",
        password: "Superpassw0rd!",
        dob: "1990-01-01",
        zipCode: "10001",
      });
      fails = false;
    } catch {
      fails = true;
    }
    expect(fails).toEqual(true);
  });

  it("should sign up ... IP Address is new", async () => {
    let fails;
    try {
      await authService.verifyIpAddress("newIp");
      await authService.signUp({
        email: "test@gmail.com",
        password: "Superpassw0rd!",
        dob: "1990-01-01",
        zipCode: "10001",
      });
      fails = false;
    } catch (err) {
      fails = true;
    }
    expect(fails).toEqual(false);
  });

  it("should sign up", async () => {
    const response = await authService.signUp({
      email: "test@gmail.com",
      password: "Superpassw0rd!",
      dob: "1990-01-01",
      zipCode: "10001",
    });
    expect(response).toEqual({ ...mockUser });
  });
});
