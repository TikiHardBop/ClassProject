import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { LegalValueService } from "./legalValues/legalValue.service";

@NgModule(
    {
        providers:
        [
            ShoppingListService,
            RecipeService,
            LegalValueService,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptorService,
                multi: true
            } 
        ]
    }
)
export class CoreModule {}