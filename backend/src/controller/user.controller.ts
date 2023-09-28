import { Request, Response } from "express";
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
} from "routing-controllers";

@JsonController("/users")
export class UserController {
  @Get("/")
  getAll(@Req() req: Request, @Res() res: Response) {
    return res.json("This action returns all users");
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }

  @Post("/")
  post(@Body() user: any) {
    return "Saving user...";
  }

  @Put("/:id")
  put(@Param("id") id: number, @Body() user: any) {
    return "Updating a user...";
  }

  @Delete("/:id")
  remove(@Param("id") id: number) {
    return "Removing user...";
  }
}
